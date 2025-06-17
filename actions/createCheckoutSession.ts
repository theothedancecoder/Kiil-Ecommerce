"use server"

import { BasketItem } from "@/app/(store)/store"
import { imageUrl } from "@/lib/ImageUrl"
import stripe from "@/lib/stripe"

export type Metadata = {
    orderNumber: string
    customerName: string
    customerEmail: string
    clerkUserId: string
}

export type GroupedBasketItem ={
    product: BasketItem["product"]
    quantity: number
}

export async function createCheckoutSession (
    items: GroupedBasketItem[],
    metadata: Metadata
){
    try{
        //check if any grouped item dont have a price
        const itemsWithoutPrice = items.filter((item) =>!item.product.price)
        if(itemsWithoutPrice.length >0){
            throw new Error("Some items dont have a price")
            
        }


        //search for existing customer by email
        const customer = await stripe.customers.list({
            email: metadata.customerEmail,
            limit: 1,
        })

        let customerId: string | undefined
        if(customer.data.length >0) {
            customerId = customer.data[0].id
        }
        const baseUrl = process.env.NODE_ENV === 'production'
        ? `https://${process.env.VERCEL_URL}`
        : process.env.NEXT_PUBLIC_BASE_URL;

        const success_url =`${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata. orderNumber}`
        const cancel_url = `${baseUrl}/cancel`
      
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        customer_creation: customerId ? undefined : "always",
        customer_email: !customerId ? metadata.customerEmail : undefined,
        metadata,
        mode: "payment",
        allow_promotion_codes: true,
        success_url: success_url,
        cancel_url: cancel_url,

       line_items: items.map((item) =>
                ({
                    price_data: {
                        currency: "nok",
                        unit_amount: Math.round(item.product.price! * 100),
                        product_data: {
                            name: item.product.name || "Unamed Product",
                            description: `Product ID: ${item.product._id} `,
                            metadata: {
                                id: item.product._id,
                    },
                    images: item.product.image
                    ?[imageUrl(item.product.image).url()]
                    :undefined,
                    },
                },
                    
                    quantity: item.quantity,
                }))
        })
        return session.url

    }catch (error){
        console.error("Error creating checkout session:", error)
        throw error

    }

}