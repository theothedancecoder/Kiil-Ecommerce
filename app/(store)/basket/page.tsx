"use client";

import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import UseBasketStore from "../store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddToBasketButton from "@/components/AddToBasketButton";
import Image from "next/image";
import { imageUrl } from "@/lib/ImageUrl";
import Loader from "@/components/Loader";
import { createCheckoutSession } from "@/actions/createCheckoutSession";
import { createVippsPayment } from "@/actions/createVippsPayment";
import { formatCurrency } from "@/lib/formatCurrency";

function BasketPage() {
  const groupedItems = UseBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "vipps">("stripe");

  // Wait for the client to be ready
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <Loader />;

  if (groupedItems.length === 0) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Basket</h1>
        <p className="text-gray-600 text-lg">Your basket is empty.</p>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);

    try {
      if (paymentMethod === "stripe") {
        const metadata = {
          orderNumber: crypto.randomUUID(),
          customerName: user?.fullName ?? "unknown",
          customerEmail: user?.emailAddresses[0].emailAddress ?? "unknown",
          clerkUserId: user!.id,
        };
        const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
        if (checkoutUrl) {
          window.location.href = checkoutUrl;
        }
      } else if (paymentMethod === "vipps") {
        // For Vipps, include customerMobileNumber in metadata
        const metadata = {
          orderNumber: crypto.randomUUID(),
          customerName: user?.fullName ?? "unknown",
          customerEmail: user?.emailAddresses[0].emailAddress ?? "unknown",
          clerkUserId: user!.id,
          customerMobileNumber: user?.phoneNumbers && user.phoneNumbers.length > 0
            ? user.phoneNumbers[0].phoneNumber
            : "", // fallback empty string if no phone number
        };
        const checkoutUrl = await createVippsPayment(groupedItems, metadata);
        if (checkoutUrl) {
          window.location.href = checkoutUrl;
        }
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-4">Your Basket</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Basket Items */}
        <div className="flex-grow">
          {groupedItems.map((item) => (
            <div
              key={item.product._id}
              className="mb-4 p-4 border rounded flex items-center justify-between"
            >
              <div
                className="flex items-center cursor-pointer flex-1 min-w-0"
                onClick={() =>
                  router.push(`/product/${item.product.slug?.current}`)
                }
              >
                <div className="w-20 h-20 sm:w-24 flex-shrink-0 mr-4">
                  {item.product.image && (
                    <Image
                      src={imageUrl(item.product.image).url()}
                      alt={item.product.name ?? "Product image"}
                      className="w-full h-full object-cover rounded"
                      width={96}
                      height={96}
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-semibold truncate">
                    {item.product.name}
                  </h2>
                  <p className="text-sm sm:text-base">
                    Price: {formatCurrency((item.product.price ?? 0) * item.quantity, "NOK")}
                  </p>
                </div>
              </div>
              <div className="flex items-center ml-4 flex-shrink-0">
                <AddToBasketButton product={item.product} />
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary and Payment Method */}
        <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded">
          <h3 className="text-xl font-semibold">Order Summary</h3>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span>Items:</span>
              <span>{groupedItems.reduce((total, item) => total + item.quantity, 0)}</span>
            </div>
            <div className="flex justify-between text-2xl font-bold border-t pt-2">
              <span>Total</span>
              <span>
                {formatCurrency(UseBasketStore.getState().getTotalPrice(), "NOK")}
              </span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mt-4">
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="paymentMethod"
                value="stripe"
                checked={paymentMethod === "stripe"}
                onChange={() => setPaymentMethod("stripe")}
                className="form-radio"
              />
              <span className="ml-2">Stripe</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="vipps"
                checked={paymentMethod === "vipps"}
                onChange={() => setPaymentMethod("vipps")}
                className="form-radio"
              />
              <span className="ml-2">Vipps</span>
            </label>
          </div>

          {/* Checkout button */}
          {isSignedIn ? (
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
              aria-label="Proceed to checkout"
            >
              {isLoading ? "Processing..." : "Checkout"}
            </button>
          ) : (
            <SignInButton mode="modal">
              <button
                className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                aria-label="Sign in to checkout"
              >
                Sign in to checkout
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </div>
  );
}

export default BasketPage;
