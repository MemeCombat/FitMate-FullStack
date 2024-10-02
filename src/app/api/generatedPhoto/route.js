import { toBase64Uri } from "@/app/helpers/baseUri";
import * as fal from "@fal-ai/serverless-client";
import { NextResponse } from "next/server";


async function processPhoto(photo) {
  if (photo && photo instanceof File) {
    const arrayBuffer = await photo.arrayBuffer();
    const base64 = btoa(
      String.fromCharCode.apply(null, new Uint8Array(arrayBuffer))
    );
    return toBase64Uri(photo.type, base64);
  }
  return null;
}

fal.config({
  credentials: process.env.FAL_KEY,
});

export async function POST(request) {
  // console.log("request: ", request);
  // const {userId} = await request.json();
  // console.log("userId: ", userId);
  const formData = await request.formData();
  // console.log("formData: ", formData);
  const personPhoto = formData.get("personPhoto");
  // console.log("name: ", name);
  const shirtPhoto = formData.get("shirtPhoto");
  // console.log("age: ", age);

  const age = formData.get("age") || "unknown";

  const weight = formData.get("weight") || "unknown";

  const height = formData.get("height") || "unknown";

  const gender = formData.get("gender") || "unknown";

  let personPhotoBase64URI ="";

  if (personPhoto && personPhoto instanceof File) {
    personPhotoBase64URI = await processPhoto(personPhoto);
    console.log("personPhotoBase64URI: ", personPhotoBase64URI);
  }
  
  let shirtPhotoBase64URI ="";

  if (shirtPhoto && shirtPhoto instanceof File) {
    shirtPhotoBase64URI = await processPhoto(shirtPhoto);
    console.log("shirtPhotoBase64URI: ", shirtPhotoBase64URI);
  }

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

  NextResponse.json(result)
}
