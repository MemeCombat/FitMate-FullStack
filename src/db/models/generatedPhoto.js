import { ObjectId } from "mongodb"
import database from "../config/mongodb"
export default class generatedPhotoModel {
    static collection(){
        return database.collection("generated_photos")
    }
    static async createPhoto(data){
        return this.collection().insertOne(data)
    }   
    static async getPhotoById(id){
        return this.collection().findOne({_id: new ObjectId(String(id))})
    }
    static async getPhotoByUserId(id){
        return this.collection().find({userId:id}).toArray()
    }
}