import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Disable CDN to ensure fresh data with variants
  useCdn: false,
  // Add perspective for better data consistency
  perspective: 'published',
  stega: {
    studioUrl:
    process.env.NODE_ENV === 'production'
    ?`https://${process.env.VERCEL_URL}/studio`
    : `${process.env.NEXT_PUBLIC_BASE_URL}/studio`,
  },
})
