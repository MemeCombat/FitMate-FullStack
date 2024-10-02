import StoreModel from "@/db/models/Store";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, description } = await request.json();
    const userId = request.headers.get("x-user-id");
    console.log("userId model: ", userId);

    await StoreModel.createStore({
      name,
      description,
      userId,
    });

    return NextResponse.json({ message: `Success create store ${name}` });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }
}

export async function GET(request) {
  const userId = request.headers.get("x-user-id");
  const store = await StoreModel.getStore(userId);
  return NextResponse.json(store);
}
