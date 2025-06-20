export default function UtendorsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">
            Utendørs
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Skape den perfekte utendørs oasen med våre eksklusive hagemøbler og utendørsløsninger.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Garden Furniture */}
          <div className="luxury-card p-8 text-center">
            <h2 className="font-serif text-2xl text-primary mb-4">Hagemøbler</h2>
            <p className="text-muted-foreground">
              Elegante utendørsmøbler i teak, aluminium og andre premium materialer.
            </p>
          </div>

          {/* Outdoor Lighting */}
          <div className="luxury-card p-8 text-center">
            <h2 className="font-serif text-2xl text-primary mb-4">Utendørsbelysning</h2>
            <p className="text-muted-foreground">
              Skape stemning med våre eksklusive utendørs belysningsløsninger.
            </p>
          </div>

          {/* Outdoor Accessories */}
          <div className="luxury-card p-8 text-center">
            <h2 className="font-serif text-2xl text-primary mb-4">Tilbehør</h2>
            <p className="text-muted-foreground">
              Parasoll, puter og andre tilbehør for den komplette utendørsopplevelsen.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
