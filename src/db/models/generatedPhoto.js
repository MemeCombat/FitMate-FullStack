import database from "../config/mongodb"
export default class generatedPhotoModel {
    static collection(){
        return database.collection("generated_photos")
    }
    static async createPhoto(data){
        return this.collection().insertOne(data)
    }   
}