import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { backendClient } from "@/sanity/lib/backendClient";

const VIPPS_WEBHOOK_SECRET = process.env.VIPPS_WEBHOOK_SECRET || "";

function verifySignature(body: string, signature: string | null): boolean {
  if (!signature) return false;
  const hmac = crypto.createHmac("sha256", VIPPS_WEBHOOK_SECRET);
  hmac.update(body);
  const expectedSignature = hmac.digest("base64");
  return signature === expectedSignature;
}

export async function POST(request: NextRequest) {
  try {
    const bodyText = await request.text();
    const signature = request.headers.get("Vipps-Signature");

    if (!verifySignature(bodyText, signature)) {
      console.error("Invalid Vipps webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const body = JSON.parse(bodyText);

    // Process the webhook event based on event type
    const eventType = body.eventType || body.type;
    const reference = body.reference || body.orderId;

    if (!reference) {
      console.error("No payment reference found in webhook payload");
      return NextResponse.json({ error: "No payment reference" }, { status: 400 });
    }

    try {
      // Find order in Sanity by Vipps payment reference
      const order = await backendClient.fetch(
        `*[_type == "order" && vippsPaymentReference == $reference][0]`,
        { reference }
      );

      if (!order) {
        console.error(`No order found for Vipps payment reference: ${reference}`);
        return NextResponse.json(
          { error: "Order not found" },
          { status: 404 }
        );
      }

      // Update order status based on event type
      let newStatus;
      switch (eventType) {
        case 'PAYMENT.CREATED':
        case 'PAYMENT.INITIATED':
          newStatus = 'pending';
          break;
        case 'PAYMENT.AUTHORIZED':
          newStatus = 'pending';
          break;
        case 'PAYMENT.CAPTURED':
          newStatus = 'paid';
          break;
        case 'PAYMENT.CANCELLED':
        case 'PAYMENT.FAILED':
          newStatus = 'cancelled';
          break;
        default:
          console.log(`Unhandled Vipps event type: ${eventType}`);
          return NextResponse.json({ received: true });
      }

      // Update order in Sanity
      await backendClient
        .patch(order._id)
        .set({ status: newStatus })
        .commit();

      console.log(`Updated order ${order._id} status to ${newStatus}`);
      return NextResponse.json({ received: true });
    } catch (error) {
      console.error("Error updating order status:", error);
      return NextResponse.json(
        { error: "Failed to update order status" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing Vipps webhook:", error);
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 });
  }
}
