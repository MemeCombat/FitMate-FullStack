class UserPhotoModel {
  static async collection() {
    return database.collection("userPhoto");
  }
  static async create(userPhoto) {
    return await this.collection().insertOne(userPhoto);
  }
  static async findById(id) {
    return await this.collection().findOne({ _id: new ObjectId(id) });
  }
  static async findByUserId(userId) {
    return await this.collection().findOne({ userId });
  }
  static async update(id, userPhoto) {
    return await this.collection().updateOne(
      { _id: new ObjectId(id) },
      { $set: userPhoto }
    );
  }
  static async delete(id) {
    return await this.collection().deleteOne({ _id: new ObjectId(id) });
  }
  static async findAll() {
    return await this.collection().find().toArray();
  }
  static async findByUserId(userId) {
    return await this.collection().findOne({ userId });
  }
  static async update(id, userPhoto) {
    return await this.collection().updateOne({ _id: new ObjectId() });
  }
}
