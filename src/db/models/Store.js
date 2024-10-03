import { ObjectId } from "mongodb";
import database from "../config/mongodb";
import { z } from "zod";

const StoreSchema = z.object({
  userId: z.string().min(1),
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

    const existingUser = await collection.findOne({
      userId: store.userId,
    });

    const existingStore = await collection.findOne({
      name: store.name,
    });

    if (existingStore) {
      throw { message: "Store name has already been used", status: 400 };
    }
    if (existingUser) {
      throw { message: "User has already create store", status: 400 };
    }

    return await collection.insertOne(store);
  }

  static async getStore() {
    const store = (await this.collection()).find().toArray();
    return store;
  }

  static async getStoreByUserId(userId) {
    const collection = await this.collection();
    const store = await collection.findOne({ userId: userId });
    return store;
  }

  static async updateDescriptionByUserId(userId, newDescription) {
    const collection = await this.collection();
    const result = await collection.updateOne(
      { userId },
      { $set: { description: newDescription } }
    );
    return result;
  }

  static async getStoreByStoreId(_id) {
    const collection = await this.collection();
    const store = await collection.findOne({ _id: new ObjectId(_id) });

    return store;
  }
}

export default StoreModel;
