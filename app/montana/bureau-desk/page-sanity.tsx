import { getMontanaProductBySlug } from '@/sanity/lib/products/getMontanaProducts';
import { notFound } from 'next/navigation';
import MontanaBureauDeskClient from './MontanaBureauDeskClient';

export default async function BureauDeskPage() {
  const product = await getMontanaProductBySlug('bureau-desk');

  if (!product) {
    notFound();
  }

  return <MontanaBureauDeskClient product={product} />;
}
