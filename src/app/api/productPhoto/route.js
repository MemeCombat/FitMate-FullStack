import ProductPhotoModel from "@/db/models/ProductPhoto";
import StoreModel from "@/db/models/Store";

export async function POST(request) {
  try {
    const { imgUrl, size, description, linkReferensi, tags } =
      await request.json();
    const userId = request.headers.get("x-user-id");
    const { _id: storeId } = await StoreModel.getStoreByUserId(userId);

    await ProductPhotoModel.createPhoto(
      imgUrl,
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
