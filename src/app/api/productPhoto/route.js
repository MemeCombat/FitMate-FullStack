import { toBase64Uri } from "@/app/helpers/baseUri";
import ProductPhotoModel from "@/db/models/ProductPhoto";
import StoreModel from "@/db/models/Store";
import { error } from "console";
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
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const sortField = searchParams.get("sortField") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const search = searchParams.get("search") || "";

    const filters = {};
    for (const [key, value] of searchParams.entries()) {
      if (
        !["page", "limit", "sortField", "sortOrder", "search"].includes(key)
      ) {
        if (key === "tags") {
          filters[key] = filters[key] ? [...filters[key], value] : [value];
        } else {
          filters[key] = value;
        }
      }
    }

    const result = await ProductPhotoModel.getAllPhoto({
      page,
      limit,
      sortField,
      sortOrder,
      search,
      filters,
    });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error fetching photos:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch photos" }), {
      status: 500,
    });
  }
}

export async function DELETE(request) {
  try {
    const { productPhotoId } = await request.json();
    const deleted = await ProductPhotoModel.deleteProductPhoto(productPhotoId);

    if (deleted) {
      return new Response(
        JSON.stringify({ message: "Product succeess to delete" }),
        {
          status: 200,
        }
      );
    } else {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 400,
      });
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
