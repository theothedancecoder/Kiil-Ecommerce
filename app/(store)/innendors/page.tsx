export default function InnendorsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">
            Innendørs
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Utforsk vår eksklusive kolleksjon av innendørsmøbler og interiør. Fra elegante sofaer til stilfulle belysningsløsninger.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Living Room */}
          <div className="luxury-card p-8 text-center">
            <h2 className="font-serif text-2xl text-primary mb-4">Stue</h2>
            <p className="text-muted-foreground">
              Sofaer, stoler, bord og belysning for et elegant og komfortabelt oppholdsrom.
            </p>
          </div>

          {/* Dining Room */}
          <div className="luxury-card p-8 text-center">
            <h2 className="font-serif text-2xl text-primary mb-4">Spisestue</h2>
            <p className="text-muted-foreground">
              Spisebord, stoler og oppbevaring for den perfekte spisestuen.
            </p>
          </div>

          {/* Bedroom */}
          <div className="luxury-card p-8 text-center">
            <h2 className="font-serif text-2xl text-primary mb-4">Soverom</h2>
            <p className="text-muted-foreground">
              Senger, nattbord og garderobeløsninger for en luksuriøs natts søvn.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
