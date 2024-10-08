import database from "../config/mongodb";

const { ObjectId } = require("mongodb");

export default class ProductPhotoModel {
  static collection() {
    return database.collection("product_photos");
  }

  static async createPhoto(
    title,
    image,
    storeId,
    size,
    description,
    linkReferensi,
    tags
  ) {
    const newPhoto = {
      title: title,
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

  static async getProductByProductId(_id) {
    return await this.collection().findOne({
      _id: new ObjectId(_id),
    });
  }

  static async getAllPhoto({
    page = 1,
    limit = 10,
    sortField = "createdAt",
    sortOrder = "desc",
    search = "",
    filters = {},
  }) {
    const skip = (page - 1) * limit;

    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (key === "_id") {
          query[key] = new ObjectId(value);
        } else if (key === "tags") {
          if (Array.isArray(value) && value.length > 0) {
            query[key] = { $in: value };
          }
        } else if (typeof value === "string") {
          query[key] = { $regex: value, $options: "i" };
        } else {
          query[key] = value;
        }
      }
    });

    const sortOptions = { [sortField]: sortOrder === "asc" ? 1 : -1 };

    const totalCount = await this.collection().countDocuments(query);
    const photos = await this.collection()
      .find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .toArray();

    return {
      photos,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    };
  }

  static async deleteProductPhoto(_id) {
    const result = await this.collection().deleteOne({
      _id: new ObjectId(_id),
    });
    return result.deletedCount > 0;
  }
}
