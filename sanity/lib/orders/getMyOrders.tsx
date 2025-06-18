import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

type OrderProduct = {
  quantity: number;
  product: {
    _id: string;
    name?: string;
    price?: number;
    image?: {
      asset?: {
        _ref: string;
        _type: "reference";
      };
      _type: "image";
    };
  };
};

const MY_ORDERS_QUERY = defineQuery(
  `*[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    OrderNumber,
    stripeCheckoutSessionId,
    stripeCustomerId,
    customerName,
    customerEmail,
    stripePaymentIntentId,
    totalPrice,
    currency,
    amountDiscount,
    status,
    orderDate,
    "products": products[]{
      "quantity": quantity,
      "product": product->{
        _id,
        name,
        price,
        image
      }
    }
  }`
);

export type OrderWithProducts = {
  _id: string;
  _type: "order";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  OrderNumber: string | null;
  stripeCheckoutSessionId: string | null;
  stripeCustomerId: string | null;
  customerName: string | null;
  customerEmail: string | null;
  stripePaymentIntentId: string | null;
  totalPrice: number | null;
  currency: string | null;
  amountDiscount: number | null;
  status: "cancelled" | "delivered" | "paid" | "pending" | "shipped" | null;
  orderDate: string | null;
  products: OrderProduct[];
};

export async function getMyOrders(userId: string): Promise<OrderWithProducts[]> {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });

    // Cast through unknown first to handle type mismatch
    return (orders.data || []) as unknown as OrderWithProducts[];
  } catch (error) {
    console.error("Error fetching orders:", error);
    console.error("Full error details:", JSON.stringify(error, null, 2));
    throw error;
  }
}

export default getMyOrders;
