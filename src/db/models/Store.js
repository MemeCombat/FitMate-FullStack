import database from "../config/mongodb";
import { z } from "zod";

const StoreSchema = z.object({
  name: z.string().min(1, "Store name is required"),
  description: z
    .string()
    .min(20, "Description should be at least 20 characters long"),
});

class StoreModel {
  static async collection() {
    return database.collection("stores");
  }

  static async createStore(store) {
    StoreSchema.parse(store);

    const collection = await this.collection();

    const existingStore = await collection.findOne({
      name: store.name,
    });

    if (existingStore) {
      throw { message: "Store name has already been used", status: 400 };
    }

    return await collection.insertOne(store);
  }
}

export default StoreModel;
