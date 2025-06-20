export default function NyheterPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">
            Nyheter
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Oppdag våre nyeste produkter og kolleksjoner. Her finner du de siste trendene innen møbler og interiør.
          </p>
        </div>
        
        <div className="mt-16 luxury-card p-8 text-center">
          <h2 className="font-serif text-2xl text-primary mb-4">Kommer snart</h2>
          <p className="text-muted-foreground">
            Vi jobber med å fylle denne siden med spennende nyheter og produkter.
          </p>
        </div>
      </div>
    </main>
  )
}
