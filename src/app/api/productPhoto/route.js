import { toBase64Uri } from "@/app/helpers/baseUri";
import ProductPhotoModel from "@/db/models/ProductPhoto";
import StoreModel from "@/db/models/Store";
import ImageKit from "imagekit";

async function processPhoto(photo) {
  if (photo && photo instanceof File) {
    const arrayBuffer = await photo.arrayBuffer();
    const base64 = btoa(
      String.fromCharCode.apply(null, new Uint8Array(arrayBuffer))
    );
    return toBase64Uri(photo.type, base64);
  }
  return null;
}

var imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT,
});

export async function POST(request) {
  try {
    const formData = await request.formData();

    const image = formData.get("image");
    const size = formData.get("size");
    const description = formData.get("description");
    const linkReferensi = formData.get("linkReferensi");
    const tags = formData.get("tags");

    let imageBase64URI = "";

    if (image instanceof File) {
      imageBase64URI = await processPhoto(image);
    }

    const resultImage = await imagekit.upload({
      file: imageBase64URI,
      fileName: `shop-photo-date:${new Date()}`,
      isPublished: true,
    });

    const userId = request.headers.get("x-user-id");
    const { _id: storeId } = await StoreModel.getStoreByUserId(userId);

    await ProductPhotoModel.createPhoto(
      resultImage.url,
      storeId,
      size,
      description,
      linkReferensi,
      tags ? tags.split(",").map((el) => el.trim()) : []
    );

    return new Response(
      JSON.stringify({
        message: "Success create photo",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating photo:", error);
    return new Response(JSON.stringify({ message: "Failed to create photo" }), {
      status: 500,
    });
  }
}

export async function GET(request) {
  try {
    // const userId = request.headers.get("x-user-id");

    const productPhotos = await ProductPhotoModel.getAllPhoto();

    return new Response(JSON.stringify(productPhotos), { status: 200 });
  } catch (error) {
    console.error("Error fetching photos:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch photos" }), {
      status: 500,
    });
  }
}
