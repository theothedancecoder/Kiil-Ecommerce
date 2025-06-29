import InteriorBanner from "@/components/InteriorBanner";
import InteriorSidebar from "@/components/InteriorSidebar";
import Flos2097Display from "../Flos2097Display";

export default function Flos2097Page() {
  return (
    <main className="min-h-screen bg-background">
      <InteriorBanner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          <InteriorSidebar />
          <div className="flex-1">
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">
                FLOS 2097/18 Chandelier Collection
              </h1>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Iconic chandelier design by Gino Sarfatti, combining traditional craftsmanship with modern elegance. Available in multiple finishes to complement any interior.
              </p>
            </div>
            <div className="max-w-8xl mx-auto">
              <Flos2097Display />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
