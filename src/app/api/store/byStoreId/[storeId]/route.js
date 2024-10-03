import StoreModel from "../../../../../db/models/Store";

export async function GET(request, { params }) {
  try {
    const storeId = params.storeId;

    const store = await StoreModel.getStoreByStoreId(storeId);

    if (!store) {
      return new Response(JSON.stringify({ message: "Store Id not found" }), {
        status: 400,
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
