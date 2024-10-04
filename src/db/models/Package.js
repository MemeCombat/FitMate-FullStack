import { ObjectId } from "mongodb";
import database from "../config/mongodb";

export default class PackageModel {
  static collection() {
    return database.collection("package");
  }

  static async createPackage(type, token, price, description) {
    const validTypes = ["BRONZE", "SILVER", "GOLD"];
    if (!validTypes.includes(type.toUpperCase())) {
      throw new Error("Invalid package type");
    }

    let validToken, validPrice;
    switch (type.toUpperCase()) {
      case "BRONZE":
        validToken = 1;
        validPrice = 5000;
        break;
      case "SILVER":
        validToken = 2;
        validPrice = 10000;
        break;
      case "GOLD":
        validToken = 3;
        validPrice = 15000;
        break;
    }

    if (token !== validToken || price !== validPrice) {
      throw new Error("Invalid token or price for the given package type");
    }

    const packageData = {
      type: type.toUpperCase(),
      token: validToken,
      price: validPrice,
      description: description,
    };

    return await this.collection().insertOne(packageData);
  }

  static async getPackage() {
    const packageData = await this.collection().find().toArray();
    return packageData;
  }

  static async updatePackage(id, newType) {
    let newToken, newPrice;
    switch (newType) {
      case "BRONZE":
        newToken = 1;
        newPrice = 5000;
        break;
      case "SILVER":
        newToken = 2;
        newPrice = 10000;
        break;
      case "GOLD":
        newToken = 3;
        newPrice = 15000;
        break;
    }

    const result = await this.collection().findOneAndUpdate(
      { _id: id },
      {
        $set: {
          type: newType,
          token: newToken,
          price: newPrice,
          description: `${newType} package`,
        },
      },
      { returnDocument: "after" }
    );

    console.log("Update result:", result);

    if (result.value) {
      return result.value;
    } else {
      const updatedDoc = await this.collection().findOne({ _id: id });
      console.log("Fetched document:", updatedDoc);
      return updatedDoc;
    }
  }

  static async deletePackage(id) {
    try {
      const result = await this.collection().deleteOne({
        _id: new ObjectId(id),
      });

      if (result.deletedCount === 1) {
        return { success: true, message: "Package deleted successfully" };
      } else {
        return { success: false, message: "Package not found" };
      }
    } catch (error) {
      console.error("Error deleting package:", error);
      return { success: false, message: "Error deleting package" };
    }
  }
}
