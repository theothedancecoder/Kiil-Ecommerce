import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

const MY_ORDERS_QUERY = defineQuery(
  `*[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {
    ...,
    products[] {
      ...,
      product->
    }
  }`
);

export async function getMyOrders(userId: string) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });

    return orders.data || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Error fetching orders");
  }
}

export default getMyOrders;
