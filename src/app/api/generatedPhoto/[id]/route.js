import generatedPhotoModel  from "../../../../db/models/generatedPhoto";

export async function GET(request, { params }) {
  const productId = params.id;

  if (productId) {
    console.log("Product ID:", productId);
    const data = await generatedPhotoModel.getPhotoById(productId);
    // console.log("data: ", data);
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
