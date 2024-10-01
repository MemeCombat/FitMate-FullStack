import StoreModel from "@/db/models/Store";

export async function GET(request , { params }) {
  try {
    const userId = params.id;
    const store = await StoreModel.getStoreByUserId(userId);

    if (!store) {
      return new Response(JSON.stringify({ message: "Store not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(store), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
