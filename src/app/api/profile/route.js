import UserModel from "../../../db/models/User";

export async function GET(request) {
  const userId = request.headers.get("x-user-id");
  console.log("userId: ", userId);
  if (userId) {
    const data = await UserModel.findById(userId);
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
