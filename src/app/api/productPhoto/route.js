import { toBase64Uri } from "@/app/helpers/baseUri";
import ProductPhotoModel from "@/db/models/ProductPhoto";
import StoreModel from "@/db/models/Store";

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

export async function POST(request) {
  try {
    const formData = await request.formData();

    const image = formData.get("image");
    const size = formData.get("size");
    const description = formData.get("description");
    const linkReferensi = formData.get("linkReferensi");
    const tags = formData.get("tags");

    let imageBase64URI = ""

    if(image instanceof File){
        imageBase64URI = await processPhoto(image)
    }

    const resultImage = await imagekit.upload({
      file: imageBase64URI, // required
      fileName: `shop-photo-date:${new Date()}`, // required
      isPublished: true
    });

    const userId = request.headers.get("x-user-id");
    const { _id: storeId } = await StoreModel.getStoreByUserId(userId);

    await ProductPhotoModel.createPhoto(
      image,
      storeId,
      size,
      description,
      linkReferensi,
      tags
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
    const userId = request.headers.get("x-user-id");

    const productPhotos = await ProductPhotoModel.getAllPhoto(userId);

    return new Response(JSON.stringify(productPhotos), { status: 200 });
  } catch (error) {
    console.error("Error fetching photos:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch photos" }), {
      status: 500,
    });
  }
}
