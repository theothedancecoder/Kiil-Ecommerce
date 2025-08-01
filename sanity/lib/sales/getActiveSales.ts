import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getActiveSales = async () => {
  const ACTIVE_SALES_QUERY = defineQuery(`*[_type == "sales" && isActive == true && dateTime(validFrom) <= now() && dateTime(validUntil) >= now()] {
    _id,
    title,
    description,
    discountAmount,
    couponCode,
    validFrom,
    validUntil,
    isActive
  } | order(validFrom desc)`);

  try {
    const result = await sanityFetch({
      query: ACTIVE_SALES_QUERY,
    });

    return result.data || [];
  } catch (error) {
    console.error("Error fetching active sales:", error);
    return [];
  }
};
