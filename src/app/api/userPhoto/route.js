import { toBase64Uri } from "@/app/helpers/baseUri";


async function processPhoto(photo) {
    if (photo && photo instanceof File) {
        const arrayBuffer = await photo.arrayBuffer();
        const base64 = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
        return toBase64Uri(photo.type, base64);
    }
    return null;
}
export async function POST(request) {
  // console.log("request: ", request);
  // const {userId} = await request.json();
  // console.log("userId: ", userId);
  const formData = await request.formData();
  // console.log("formData: ", formData);
  const personPhoto = formData.get("personPhoto");
  // console.log("name: ", name);
  const shirtPhoto = formData.get("shirtPhoto");

  // Check if the files exist
  if (personPhoto && personPhoto instanceof File) {
    const personPhotoBase64URI = await processPhoto(personPhoto)
    console.log("personPhotoBase64URI: ", personPhotoBase64URI);
  }

  if (shirtPhoto && shirtPhoto instanceof File) {
    const shirtPhotoBase64URI = await processPhoto(shirtPhoto)
    console.log("shirtPhotoBase64URI: ", shirtPhotoBase64URI);
  }
}
