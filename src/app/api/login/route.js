import { comparePassword } from "@/app/helpers/bcrypt";
import { signToken } from "@/app/helpers/jwt";
import UserModel from "@/db/models/User";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const user = await UserModel.findyByEmail(email);
    if (!user) throw { message: "Invalid Email/Password", status: 400 };

    const isValidPassword = comparePassword(password, user.password);
    if (!isValidPassword)
      throw { message: "Invalid Email/Password", status: 400 };

    const payload = {
      _id: user._id.toString(),
    };
    const accessToken = signToken(payload);
    cookies().set("Authorization", `Bearer ${accessToken}`);

    return Response.json({ accessToken });
  } catch (error) {
    const message = error.message || "Internal Server Error";
    const status = error.status || 500;

    return Response.json({ message }, { status });
  }
}
