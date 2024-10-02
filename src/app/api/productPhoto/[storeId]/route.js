import ProductPhotoModel from "@/db/models/ProductPhoto";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const storeId = params.storeId;
    const photo = await ProductPhotoModel.getPhotoByStoreId(storeId);

    if (!photo) {
      return new NextResponse(JSON.stringify({ message: "Photo not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(photo), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Internal server error",
      }),
      { status: 500 }
    );
  }
}
