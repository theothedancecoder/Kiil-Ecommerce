import InteriorBanner from "@/components/InteriorBanner";
import InteriorSidebar from "@/components/InteriorSidebar";
import InteriorFurnitureGrid from "@/components/InteriorFurnitureGrid";

export default async function InteriorPage() {
  return (
    <main className="min-h-screen bg-background">
      <InteriorBanner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          <InteriorSidebar />
          <div className="flex-1">
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">
                Interiør
              </h1>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Skape det perfekte interiøret med våre eksklusive møbler og interiørløsninger.
              </p>
            </div>
            <div className="max-w-8xl mx-auto">
              <InteriorFurnitureGrid />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
