import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export const backendClient = createClient ({
    projectId,
    dataset,
    apiVersion,
    useCdn: true, // set to false if statistically generating pages, using ISR or tag-based revalidation
    token: process.env.SANITY_API_TOKEN,
    });