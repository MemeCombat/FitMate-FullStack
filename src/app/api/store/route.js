import StoreModel from "@/db/models/Store";
import { cookies } from "next/headers";
import { z } from "zod";

export async function POST(request) {
  try {
    const { name, description } = await request.json();
    const access_token = cookies;
    await StoreModel.createStore({
      name,
      description,
    });
    return Response.json({
      message: `Success create store ${name}`,
    });
  } catch (error) {
    let message = error.message || "Internal Server Error";
    let status = error.status || 500;

    if (error instanceof z.ZodError) {
      message = error.errors[0].message;
      status = 400;
    }
    return Response.json({ message }, { status });
  }
}
