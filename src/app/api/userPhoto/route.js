import { toBase64Uri } from "@/app/helpers/baseUri";

export async function POST(request) {
    // const {userId} = await request.json();
    // console.log("userId: ", userId);
    if (!request.files || !request.files.photo) {
        throw { name: "unknown file", status: 400, message: "No file uploaded" };
    }
    const base64 = req.files.photo.data.toString("base64");
    const base64URI = toBase64Uri(req.files.photo.mimetype, base64);  

}
