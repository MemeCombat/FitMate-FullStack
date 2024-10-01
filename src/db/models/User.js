import { hashPassword } from "@/app/helpers/bcrypt";
import database from "../config/mongodb";
import { z } from "zod";

const UserSchema = z.object({
  username: z.string().min(1),
  email: z.string().email().min(10),
  password: z.string().min(5),
});

class UserModel {
  static collection() {
    return database.collection("users");
  }
  static async create(user) {
    UserSchema.parse(user);
    user.password = hashPassword(user.password);

    const existingUser = await this.collection().findOne({
      $or: [{ email: user.email }, { username: user.username }],
    });
    if (existingUser)
      throw { message: "Email/Username has been used", status: 400 };
    return await this.collection().insertOne(user);
  }
  static async findyByEmail(email) {
    return await this.collection().findOne({ email });
  }
}

export default UserModel;
