export default function MoblerPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">
            Møbler
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Utforsk vår komplette møbelkolleksjon. Fra klassiske design til moderne innovasjoner.
          </p>
        </div>

        {/* Furniture Categories Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Sofas */}
          <div className="luxury-card p-6 text-center">
            <h3 className="font-serif text-xl text-primary mb-3">Sofaer</h3>
            <p className="text-muted-foreground text-sm">
              Komfortable og stilfulle sofaer i premium materialer.
            </p>
          </div>

          {/* Chairs */}
          <div className="luxury-card p-6 text-center">
            <h3 className="font-serif text-xl text-primary mb-3">Stoler</h3>
            <p className="text-muted-foreground text-sm">
              Elegante stoler for enhver anledning og rom.
            </p>
          </div>

          {/* Tables */}
          <div className="luxury-card p-6 text-center">
            <h3 className="font-serif text-xl text-primary mb-3">Bord</h3>
            <p className="text-muted-foreground text-sm">
              Spisebord, sofabord og arbeidsbord i eksklusive design.
            </p>
          </div>

          {/* Storage */}
          <div className="luxury-card p-6 text-center">
            <h3 className="font-serif text-xl text-primary mb-3">Oppbevaring</h3>
            <p className="text-muted-foreground text-sm">
              Smarte og stilfulle oppbevaringsløsninger.
            </p>
          </div>

          {/* Beds */}
          <div className="luxury-card p-6 text-center">
            <h3 className="font-serif text-xl text-primary mb-3">Senger</h3>
            <p className="text-muted-foreground text-sm">
              Luksuriøse senger for den perfekte natts søvn.
            </p>
          </div>

          {/* Lighting */}
          <div className="luxury-card p-6 text-center">
            <h3 className="font-serif text-xl text-primary mb-3">Belysning</h3>
            <p className="text-muted-foreground text-sm">
              Designer belysning som skaper den rette stemningen.
            </p>
          </div>

          {/* Accessories */}
          <div className="luxury-card p-6 text-center">
            <h3 className="font-serif text-xl text-primary mb-3">Tilbehør</h3>
            <p className="text-muted-foreground text-sm">
              Dekorative elementer og praktiske tilbehør.
            </p>
          </div>

          {/* Custom */}
          <div className="luxury-card p-6 text-center">
            <h3 className="font-serif text-xl text-primary mb-3">Spesialtilpasset</h3>
            <p className="text-muted-foreground text-sm">
              Skreddersydde møbler etter dine ønsker.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
