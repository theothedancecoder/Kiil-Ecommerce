"use server";

import VippsClient from "@/lib/vipps";
import { BasketItem } from "@/app/(store)/store";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
  customerMobileNumber: string; // Added mobile number field
};

export type GroupedBasketItem = {
  product: BasketItem["product"];
  quantity: number;
};

// Load Vipps credentials from environment variables
const vippsClient = new VippsClient(
  process.env.VIPPS_CLIENT_ID || "",
  process.env.VIPPS_CLIENT_SECRET || "",
  process.env.VIPPS_SUBSCRIPTION_KEY_PRIMARY || "",
  process.env.VIPPS_SUBSCRIPTION_KEY_SECONDARY || ""
);

export async function createVippsPayment(
  items: GroupedBasketItem[],
  metadata: Metadata
): Promise<string> {
  try {
    // Validate items have prices
    const itemsWithoutPrice = items.filter((item) => !item.product.price);
    if (itemsWithoutPrice.length > 0) {
      throw new Error("Some items don't have a price");
    }

    // Calculate total amount in øre (NOK minor unit)
    const totalAmount = items.reduce(
      (sum, item) => sum + item.product.price! * item.quantity,
      0
    );
    const totalAmountInOere = Math.round(totalAmount * 100);

    // Construct Vipps payment request payload
    const paymentRequest = {
      merchantInfo: {
        merchantSerialNumber: process.env.VIPPS_MERCHANT_SERIAL_NUMBER || "",
        callbackPrefix: process.env.VIPPS_CALLBACK_PREFIX || "",
        fallBack: process.env.VIPPS_FALLBACK_URL || "",
        // Add other merchant info as needed
      },
      customerInfo: {
        mobileNumber: metadata.customerMobileNumber, // Use mobile number instead of email
      },
      transaction: {
        orderId: metadata.orderNumber,
        amount: totalAmountInOere,
        currency: "NOK",
        // Add other transaction details as needed
      },
      // Add other required fields per Vipps API spec
    };

    // Initiate payment with Vipps
    const response = await vippsClient.initiatePayment(paymentRequest);

    // Extract URL from response
    const paymentUrl = (response as { url: string }).url;
    if (!paymentUrl) {
      throw new Error("Vipps payment URL not returned");
    }

    return paymentUrl;
  } catch (error) {
    console.error("Error creating Vipps payment:", error);
    throw error;
  }
}
