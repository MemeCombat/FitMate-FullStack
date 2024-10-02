import * as fal from "@fal-ai/serverless-client";
import { NextResponse } from "next/server";

async function processPhoto(photo) {
  if (photo && photo instanceof File) {
    const arrayBuffer = await photo.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    return `data:${photo.type};base64,${base64}`;
  }
  return null;
}

console.log("process.env.FAL_KEY: ", process.env.FAL_KEY)
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
      onQueueUpdate: update => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map(log => log.message).forEach(console.log);
        }
      },
    });
    let imgUrl = result.image.url;
    let content_type = result.image.content_type;

    
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}


// {
//   "image": {
//       "url": "https://storage.googleapis.com/isolate-dev-hot-rooster_toolkit_bucket/github_110602490/b17a592dac1c438292d33a456aa788cd_247ade006d254ef6baae14d8225595c4.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=gke-service-account%40isolate-dev-hot-rooster.iam.gserviceaccount.com%2F20241002%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20241002T084440Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=host&X-Goog-Signature=7993c3bf50541becd7d55d83ed08999b8b14001b9e864fb4290dc1a01546bc6897865e60b25fb6a242019967de64a908ef14acb91407b716a9d0404f73613f81d63ee606897c3b8a7d06384e8b1bb1a3bae0cb793781a30bcd5306569ed494456465c8689169eb365b7d82b413f5d208852b80fd46bc0dc525ac058b14fe1ebeac8cbbfec86822ac433992265ab714cf3a9c4f28c3c947f046aea646786a23bddc2b604bb07e3e2bb108a911520bd2412ac68117f78e5b97a46ad33215def81fe70cd6c400cc28ad88bb67ac2cdeba9794987adb0f481dbd01feea7da7f9c36bd76d0e1e3defc06ca2f056eb2bef5248e53fb84fb9fc66753bfc7c6588233047",
//       "content_type": "image/png",
//       "file_name": "247ade006d254ef6baae14d8225595c4.png",
//       "file_size": 877419,
//       "width": 1024,
//       "height": 784
//   }
// }