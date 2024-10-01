import UserModel from "@/db/models/User";
import { z } from "zod";

export async function POST(request) {
  try {
    const { email, username, password } = await request.json();
    console.log({ email, username, password });

    await UserModel.create({
      email,
      username,
      password,
    });

    return Response.json({ message: `Success register user ${username}` });
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
