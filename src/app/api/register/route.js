import UserModel from "@/db/models/User";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request) {
  try {
    const { email, username, password, tags } = await request.json();
    console.log({ email, username, password, tags });
    const token = 3;
    await UserModel.create({
      email,
      username,
      password,
      token,
      tags,
    });

    return NextResponse.json({ message: `Success register user ${username}` });
    
  } catch (error) {
    let message = error.message || "Internal Server Error";
    let status = error.status || 500;

    if (error instanceof z.ZodError) {
      message = error.errors[0].message;
      status = 400;
    }
    return NextResponse.json({ message }, { status });
  }
}
