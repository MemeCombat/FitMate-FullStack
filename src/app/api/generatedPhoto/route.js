import * as fal from "@fal-ai/serverless-client";
import { NextResponse } from "next/server";
import ImageKit from "imagekit";
import generatedPhotoModel from "../../../db/models/generatedPhoto";
import { GoogleGenerativeAI } from "@google/generative-ai";
import UserModel from "../../../db/models/User";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
console.log("genAI: ", genAI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
console.log("model: ", model);

async function processPhoto(photo) {
  if (photo && photo instanceof File) {
    const arrayBuffer = await photo.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    return `data:${photo.type};base64,${base64}`;
  }
  return null;
}

console.log("process.env.GEMINI_API_KEY: ", process.env.GEMINI_API_KEY);

var imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT,
});

console.log("process.env.FAL_KEY: ", process.env.FAL_KEY);

fal.config({
  credentials: process.env.FAL_KEY,
});

async function geminiAi(prompt) {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.log(err);
  }
}

export async function POST(request) {
  const formData = await request.formData();
  console.log("formData: ", formData);

  const personPhoto = formData.get("personPhoto");
  console.log("personPhoto: ", personPhoto);
  const shirtPhoto = formData.get("shirtPhoto");
  console.log("shirtPhoto: ", shirtPhoto);

  const age = formData.get("age") || "unknown";
  const weight = formData.get("weight") || "unknown";
  const height = formData.get("height") || "unknown";
  const gender = formData.get("gender") || "unknown";
  const shopId = formData.get("shopId") || "userUploadedPhoto";
  const productPhotoId = formData.get("productPhotoId") || "userUploadedPhoto";

  let personPhotoBase64URI = await processPhoto(personPhoto);

  let shirtPhotoBase64URI = await processPhoto(shirtPhoto);

  try {
    const userId = request.headers.get("x-user-id");
    const decreased = await UserModel.decreaseToken(userId);
    if (!decreased) throw { message: "inffused token", status: 400 };

    // const result = await fal.subscribe("fal-ai/omni-zero", {
    //   input: {
    //     prompt: `A ${gender} with ${age} years old, ${height} cm tall, ${weight}kg , make it realistic  , no fillter , no beautify`,
    //     image_url: personPhotoBase64URI,
    //     composition_image_url: personPhotoBase64URI,
    //     style_image_url: shirtPhotoBase64URI,
    //     identity_image_url: personPhotoBase64URI,
    //   },
    //   logs: true,
    //   onQueueUpdate: (update) => {
    //     if (update.status === "IN_PROGRESS") {
    //       update.logs.map((log) => log.message).forEach(console.log);
    //     }
    //   },
    // });
    
    const result = await fal.subscribe("fal-ai/cat-vton", {
      input: {
        human_image_url: personPhotoBase64URI,
        garment_image_url: shirtPhotoBase64URI,
        cloth_type: "upper",
        image_size: "portrait_4_3",
        num_inference_steps: 30,
        guidance_scale: 2.5
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });

    console.log("result: ", result);
    const signedUrl = result.image.url;
    const resultImage = await imagekit.upload({
      file: signedUrl,
      fileName: `user-photo-userid:${userId}-date:${new Date()}`,
      isPublished: true,
    });

    console.log("resultImage: ", resultImage);
    const imgUrl = resultImage.url;
    console.log("imgUrl: ", imgUrl);

    const generatePrompt = ` I'm a ${gender} , ${age} years old, ${height} cm tall, and weigh ${weight} kg. What are some fashion recommendations based on my body type? also give the good size recomendation if the size S: 63 x 43 ,M: 70 x 52 , L: 73 x 55,XL: 75 x 57,XXL: 79 x 60 , XXXL: 82 x 63 : for male , and ,S: 55 x 39 , M: 58 x 42 , L: 61 x 45 , XL: 64 x 48,XXL: 67 x 51, XXXL: 70 x 64
    for women
    for this body dimension create without \`\`\`json and \`\`\` , without color,  in the respon just the fashion recommendation , do note tell Fashion Recommendations for a [age]-Year-Old Male, [heigh] cm Tall, and [weight] kg  , do not tell based on provided chart `;
    const resultGemini = await geminiAi(generatePrompt);
    // console.log("resultGemini: ", resultGemini);
    const createdPhoto = await generatedPhotoModel.createPhoto({
      imgUrl,
      userId,
      height,
      weight,
      gender,
      shopId,
      productPhotoId,
      resultGemini,
    });
    return NextResponse.json({
      resultImage,
      createdPhoto,
      shopId,
      productPhotoId,
      weight,
      height,
      gender,
      resultGemini,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
