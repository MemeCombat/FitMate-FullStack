import ProductPhotoModel from "../../../../../db/models/ProductPhoto";

export async function GET(request, { params }) {
  try {
    const productId = params.id;
    console.log(productId, "???//");

    const product = await ProductPhotoModel.getProductByProductId(productId);
    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(product), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
