import database from "../config/mongodb";

const { ObjectId } = require("mongodb");

export default class ProductPhotoModel {
  static collection() {
    return database.collection("product_photos");
  }

  static async createPhoto(
    image,
    storeId,
    size,
    description,
    linkReferensi,
    tags
  ) {
    const newPhoto = {
      image: image,
      storeId: storeId,
      size: size,
      description: description,
      linkReferensi: linkReferensi,
      tags: tags,
    };
    return await this.collection().insertOne(newPhoto);
  }

  static async getPhotoByStoreId(storeId) {
    return await this.collection().findOne({
      storeId: new ObjectId(String(storeId)),
    });
  }

  static async getAllPhoto() {
    return await this.collection().find().toArray();
  }
}
