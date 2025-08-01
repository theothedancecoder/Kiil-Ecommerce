import type { Metadata } from "next";
import OptimizedHeader from "@/components/OptimizedHeader";
import { SanityLive } from "@/sanity/lib/live";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/DisableDraftMode";

export const metadata: Metadata = {
  title: "Kiil Interior Designs",
  description: "Premium Scandinavian furniture and design for modern living",
};

export default async function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraftMode = (await draftMode()).isEnabled;
  
  return (
    <>
      {isDraftMode && (
        <>
          <DisableDraftMode/>
          <VisualEditing/>
        </>
      )}

      <main>  
        <OptimizedHeader/>
        {children}
      </main>
      <SanityLive/> {/*it is a sanity live component//dont forget this else  live update wont work*/}
    </>
  );
}
