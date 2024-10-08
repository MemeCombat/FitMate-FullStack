import { ObjectId } from "mongodb";
import database from "../config/mongodb";
import { z } from "zod";
import { pipeline } from "stream";

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
    // console.log("userId: ", userId);
    const pipeline = [
      {
        $match:
          /**
           * query: The query in MQL.
           */
          {
            userId: userId,
          },
      },
      {
        $lookup:
          /**
           * from: The target collection.
           * localField: The local join field.
           * foreignField: The target join field.
           * as: The name for the results.
           * pipeline: Optional pipeline to run on the foreign collection.
           * let: Optional variables to use in the pipeline field stages.
           */
          {
            from: "product_photos",
            localField: "_id",
            foreignField: "storeId",
            as: "product",
          },
      },
    ];
    const store = await collection.aggregate(pipeline).toArray();
    console.log("store: ", store);
    if (!store) throw new Error("You Need To Make Store First");
    return store;
  }

  static async updateDescriptionByUserId(userId, newDescription) {
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
