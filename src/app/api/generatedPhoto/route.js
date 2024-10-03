import * as fal from "@fal-ai/serverless-client";
import { NextResponse } from "next/server";
import ImageKit from "imagekit";
import generatedPhotoModel from "../../../db/models/generatedPhoto";

async function processPhoto(photo) {
  if (photo && photo instanceof File) {
    const arrayBuffer = await photo.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    return `data:${photo.type};base64,${base64}`;
  }
  return null;
}

var imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT,
});

console.log("process.env.FAL_KEY: ", process.env.FAL_KEY);

fal.config({
  credentials: process.env.FAL_KEY,
});

export async function POST(request) {
  const formData = await request.formData();

  const personPhoto = formData.get("personPhoto");
  const shirtPhoto = formData.get("shirtPhoto");

  const age = formData.get("age") || "unknown";
  const weight = formData.get("weight") || "unknown";
  const height = formData.get("height") || "unknown";
  const gender = formData.get("gender") || "unknown";
  const shopId = formData.get("shopId")|| "userUploadedPhoto";
  const productPhotoId = formData.get("productPhotoId") || "userUploadedPhoto";

  let personPhotoBase64URI = await processPhoto(personPhoto);

  let shirtPhotoBase64URI = await processPhoto(shirtPhoto);

  try {
    const result = await fal.subscribe("fal-ai/omni-zero", {
      input: {
        prompt: `A ${gender} with ${age} years old, ${height} cm tall, ${weight} kg make the face realistic`,
        image_url: personPhotoBase64URI,
        composition_image_url: personPhotoBase64URI,
        style_image_url: shirtPhotoBase64URI,
        identity_image_url: personPhotoBase64URI,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });

    const signedUrl = result.image.url;

    // console.log("signedUrl: ", signedUrl);
    const userId = request.headers.get("x-user-id");
    // console.log("userId: ", userId);
    const resultImage = await imagekit.upload({
      file: signedUrl, // required
      fileName: `user-photo-userid:${userId}-date:${new Date()}`, // required
      isPublished: true,
    });
    console.log("resultImage: ", resultImage);
    const imgUrl = resultImage.url;
    console.log("imgUrl: ", imgUrl);
    const createdPhoto = await generatedPhotoModel.createPhoto({imgUrl , userId,height,weight,gender,shopId ,productPhotoId });
    return NextResponse.json({resultImage,createdPhoto,shopId , productPhotoId ,weight ,height,gender});
  } catch (error) {
    console.error("Error:", error); 
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
