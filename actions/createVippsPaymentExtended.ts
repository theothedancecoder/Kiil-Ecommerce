"use server";

import VippsClientExtended from "@/lib/vipps_extended";
import { BasketItem } from "@/app/(store)/store";
import { backendClient } from "@/sanity/lib/backendClient";
import crypto from "crypto";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
};

export type GroupedBasketItem = {
  product: BasketItem["product"];
  quantity: number;
};

// Load Vipps credentials from environment variables
const vippsClient = new VippsClientExtended(
  process.env.VIPPS_CLIENT_ID || "",
  process.env.VIPPS_CLIENT_SECRET || "",
  process.env.VIPPS_SUBSCRIPTION_KEY_PRIMARY || "",
  process.env.VIPPS_SUBSCRIPTION_KEY_SECONDARY || ""
);

export async function createVippsPaymentExtended(
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
        mobileNumber: metadata.customerEmail, // Vipps expects mobile number, adjust accordingly
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

    // Create order in Sanity with pending status
    const sanityProducts = items.map((item) => ({
      _key: crypto.randomUUID(),
      product: {
        _type: "reference",
        _ref: item.product._id,
      },
      quantity: item.quantity,
    }));

    await backendClient.create({
      _type: "order",
      orderNumber: metadata.orderNumber,
      vippsPaymentReference: metadata.orderNumber, // Using orderNumber as reference
      paymentProvider: "vipps",
      customerName: metadata.customerName,
      customerEmail: metadata.customerEmail,
      clerkUserId: metadata.clerkUserId,
      currency: "NOK",
      products: sanityProducts,
      totalPrice: totalAmount,
      status: "pending",
      orderDate: new Date().toISOString(),
    });

    return paymentUrl;
  } catch (error) {
    console.error("Error creating Vipps payment:", error);
    throw error;
  }
}
