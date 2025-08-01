import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products - Kiil Interior Designs",
  description: "Browse our complete collection of luxury Scandinavian furniture and interior design",
};

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
