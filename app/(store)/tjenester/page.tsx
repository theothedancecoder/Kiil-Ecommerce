export default function TjenesterPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">
            Tjenester
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Opplev våre eksklusive tjenester designet for å gi deg den beste handleopplevelsen.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Interior Design */}
          <div className="luxury-card p-8">
            <h2 className="font-serif text-2xl text-primary mb-4 text-center">Interiørdesign</h2>
            <p className="text-muted-foreground mb-6">
              La våre erfarne interiørdesignere hjelpe deg med å skape det perfekte rom. Vi tilbyr:
            </p>
            <ul className="space-y-3 text-foreground">
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Personlig konsultasjon
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                3D-visualisering
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Fargepalett og materialvalg
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Møbleringsplan
              </li>
            </ul>
          </div>

          {/* Installation */}
          <div className="luxury-card p-8">
            <h2 className="font-serif text-2xl text-primary mb-4 text-center">Montering</h2>
            <p className="text-muted-foreground mb-6">
              Profesjonell montering og installasjon av alle våre produkter:
            </p>
            <ul className="space-y-3 text-foreground">
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Møbelmontering
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Belysningsinstallasjon
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Garderobe oppsett
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Kvalitetskontroll
              </li>
            </ul>
          </div>

          {/* Custom Solutions */}
          <div className="luxury-card p-8">
            <h2 className="font-serif text-2xl text-primary mb-4 text-center">Spesialtilpasning</h2>
            <p className="text-muted-foreground mb-6">
              Skreddersydde løsninger tilpasset dine behov:
            </p>
            <ul className="space-y-3 text-foreground">
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Måltilpassede møbler
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Materialtilpasning
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Fargetilpasning
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Spesialdesign
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground">
            Ønsker du mer informasjon om våre tjenester?
          </p>
          <button className="luxury-button mt-4">
            Kontakt oss
          </button>
        </div>
      </div>
    </main>
  )
}
