import ProductPhotoModel from "../../../../db/models/ProductPhoto";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const sortField = searchParams.get("sortField") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const search = searchParams.get("search") || "";

    const filters = {};
    for (const [key, value] of searchParams.entries()) {
      if (
        !["page", "limit", "sortField", "sortOrder", "search"].includes(key)
      ) {
        filters[key] = value;
      }
    }

    const result = await ProductPhotoModel.getAllPhoto({
      page,
      limit,
      sortField,
      sortOrder,
      search,
      filters,
    });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error fetching photos:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch photos" }), {
      status: 500,
    });
  }
}
