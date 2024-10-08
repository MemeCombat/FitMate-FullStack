import generatedPhotoModel from "../../../../db/models/generatedPhoto";

export async function GET(request) {
  const userId = request.headers.get("x-user-id");
  console.log("userId: ", userId);

  if (userId) {
    console.log("Product ID:", userId);
    const data = await generatedPhotoModel.getPhotoByUserId(userId);
    //   console.log("data: ", data);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response(JSON.stringify({ error: "Product ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
