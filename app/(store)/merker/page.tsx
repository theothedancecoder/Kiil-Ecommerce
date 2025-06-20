export default function MerkerPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">
            Merker
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Utforsk vårt utvalg av eksklusive designmerker og produsenter.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Featured Brands */}
          <div className="luxury-card p-8">
            <h2 className="font-serif text-2xl text-primary mb-4 text-center">Premium Merker</h2>
            <div className="space-y-4">
              <div className="p-4 bg-background/50 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Fritz Hansen</h3>
                <p className="text-muted-foreground text-sm">
                  Dansk designtradisjon møter moderne eleganse.
                </p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Vitra</h3>
                <p className="text-muted-foreground text-sm">
                  Ikoniske møbler og innovativt design.
                </p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Carl Hansen & Søn</h3>
                <p className="text-muted-foreground text-sm">
                  Håndverkskunst i verdensklasse.
                </p>
              </div>
            </div>
          </div>

          {/* Lighting Brands */}
          <div className="luxury-card p-8">
            <h2 className="font-serif text-2xl text-primary mb-4 text-center">Belysning</h2>
            <div className="space-y-4">
              <div className="p-4 bg-background/50 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Louis Poulsen</h3>
                <p className="text-muted-foreground text-sm">
                  Skandinavisk lysdesign i toppklasse.
                </p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Flos</h3>
                <p className="text-muted-foreground text-sm">
                  Italiensk designbelysning.
                </p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Tom Dixon</h3>
                <p className="text-muted-foreground text-sm">
                  Britisk design med særpreg.
                </p>
              </div>
            </div>
          </div>

          {/* Textile Brands */}
          <div className="luxury-card p-8">
            <h2 className="font-serif text-2xl text-primary mb-4 text-center">Tekstiler</h2>
            <div className="space-y-4">
              <div className="p-4 bg-background/50 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Kvadrat</h3>
                <p className="text-muted-foreground text-sm">
                  Premium tekstiler og design.
                </p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Designers Guild</h3>
                <p className="text-muted-foreground text-sm">
                  Luksuriøse stoffer og tapeter.
                </p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Romo</h3>
                <p className="text-muted-foreground text-sm">
                  Eksklusive interiørtekstiler.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Values */}
        <div className="mt-16 text-center">
          <h2 className="font-serif text-3xl text-primary mb-8">Våre merkeverdier</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="luxury-card p-6">
              <h3 className="font-medium text-lg mb-2">Kvalitet</h3>
              <p className="text-muted-foreground">
                Vi velger kun merker som leverer eksepsjonell kvalitet.
              </p>
            </div>
            <div className="luxury-card p-6">
              <h3 className="font-medium text-lg mb-2">Bærekraft</h3>
              <p className="text-muted-foreground">
                Fokus på miljøvennlige og bærekraftige produksjonsmetoder.
              </p>
            </div>
            <div className="luxury-card p-6">
              <h3 className="font-medium text-lg mb-2">Design</h3>
              <p className="text-muted-foreground">
                Tidløst design som varer i generasjoner.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
