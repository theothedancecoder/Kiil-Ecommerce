import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = imageUrlBuilder(client);

export function imageUrl(source: SanityImageSource) {
  return builder.image(source);
}
