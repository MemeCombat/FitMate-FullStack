import database from "../config/mongodb";

const { ObjectId } = require("mongodb");

class ProductPhotoModel {
  static collection() {
    return database.collection("product_photos");
  }

  static async createPhoto(
    imgUrl,
    storeId,
    size,
    description,
    linkReferensi,
    tags
  ) {
    const newPhoto = {
      imgUrl: imgUrl,
      storeId: storeId,
      size: size,
      description: description,
      linkReferensi: linkReferensi,
      tags: tags,
    };
    return await this.collection().insertOne(newPhoto);
  }

  static async getPhotoByStoreId() {
    return await this.collection().find().toArray();
  }
}

export default ProductPhotoModel;
