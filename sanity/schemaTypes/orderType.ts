import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const OrderType = defineType({
  name: "order",
  type: "document",
  icon: BasketIcon,
  title: "Order",
  fields: [
    defineField({
      name: "orderNumber",
      title: "Order Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stripeCheckoutSessionId",
      title: "Stripe Checkout Session ID",
      type: "string",
    }),
    defineField({
      name: "stripeCustomerId",
      title: "Stripe Customer ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customerEmail",
      title: "Customer Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "stripePaymentIntentId",
      title: "Stripe Payment Intent ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    // Optional total and currency fields (for preview purposes)
    defineField({
      name: "totalPrice",
      title: "Total Price",
      type: "number",
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
    }),

    defineField ({
        name: "amountDiscount",
        title: "Amount Discount",
        type: "number",
        validation: (Rule) =>  Rule.min(0),
        }),
     defineField ({ 
        name: "status",
        title: "Order Status",
        type: "string",
        options: {
            list: [
                { title: "Pending", value: "pending" },
                { title: "Paid", value: "paid" },
                { title: "Shipped", value: "shipped" },
                { title: "Delivered", value: "delivered" },
                { title: "Cancelled", value: "cancelled" },
                ],
                },
                }),

      defineField ({
        name: "orderDate",
        title: "Order Date",
        type: "datetime",
        validation: (Rule) => Rule.required(),
        }),
      
    ],
    preview: {
        select: {
            name: 'customerName',
            amount: 'totalPrice',
            currency: 'currency',
            orderId: 'orderNumber',
            email: 'customerEmail',
        },

           
            prepare (select) {
               const orderIdSnippet =`${select.orderId.slice(0,5)}...${select.orderId.slice(-5)}`
              return {
                title: `${select.name} ${orderIdSnippet}`,
                subtitle: ` $${select.amount} ${select.currency}, ${select.email}`,
                media: BasketIcon,
              };
            },
          },
        })
