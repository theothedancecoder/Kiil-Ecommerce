export default function SelskapPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">
            Om Kiil
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            En ledende leverandør av eksklusive møbler og interiørløsninger i Norge.
          </p>
        </div>

        {/* Company Story */}
        <div className="mt-16">
          <div className="luxury-card p-8 md:p-12">
            <h2 className="font-serif text-3xl text-primary mb-6 text-center">Vår Historie</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-4">
                Siden etableringen har Kiil vært dedikert til å levere møbler og interiørløsninger av høyeste kvalitet. 
                Vi har bygget vår virksomhet på grunnleggende verdier som kvalitet, design og kundetilfredshet.
              </p>
              <p>
                I dag er vi stolte av å representere noen av verdens mest prestisjefylte merker og designere, 
                samtidig som vi fortsetter å utvikle våre egne eksklusive kolleksjoner.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="luxury-card p-8">
            <h3 className="font-serif text-2xl text-primary mb-4 text-center">Kvalitet</h3>
            <p className="text-muted-foreground">
              Vi velger våre produkter og partnere med omhu for å sikre at kun det beste når våre kunder. 
              Hvert møbel er et vitnesbyrd om vår dedikasjon til kvalitet.
            </p>
          </div>

          <div className="luxury-card p-8">
            <h3 className="font-serif text-2xl text-primary mb-4 text-center">Bærekraft</h3>
            <p className="text-muted-foreground">
              Vi tar ansvar for miljøet gjennom bærekraftige praksiser og ved å velge leverandører 
              som deler vårt engasjement for en grønnere fremtid.
            </p>
          </div>

          <div className="luxury-card p-8">
            <h3 className="font-serif text-2xl text-primary mb-4 text-center">Service</h3>
            <p className="text-muted-foreground">
              Vår dedikerte kundeservice er her for å hjelpe deg med å finne de perfekte løsningene 
              for ditt hjem eller prosjekt.
            </p>
          </div>
        </div>

        {/* Team */}
        <div className="mt-16">
          <h2 className="font-serif text-3xl text-primary mb-8 text-center">Vårt Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="luxury-card p-6 text-center">
              <h3 className="font-medium text-lg mb-2">Ledelse</h3>
              <p className="text-muted-foreground">
                Erfarne fagfolk med lidenskap for design og kvalitet.
              </p>
            </div>
            <div className="luxury-card p-6 text-center">
              <h3 className="font-medium text-lg mb-2">Designteam</h3>
              <p className="text-muted-foreground">
                Kreative sjeler som skaper unike interiørløsninger.
              </p>
            </div>
            <div className="luxury-card p-6 text-center">
              <h3 className="font-medium text-lg mb-2">Kundeservice</h3>
              <p className="text-muted-foreground">
                Dedikerte rådgivere som setter dine behov først.
              </p>
            </div>
            <div className="luxury-card p-6 text-center">
              <h3 className="font-medium text-lg mb-2">Logistikk</h3>
              <p className="text-muted-foreground">
                Eksperter som sikrer sikker levering av dine møbler.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <h2 className="font-serif text-3xl text-primary mb-6">Ta Kontakt</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Vi er her for å hjelpe deg med å skape ditt drømmehjem.
          </p>
          <button className="luxury-button">
            Kontakt Oss
          </button>
        </div>
      </div>
    </main>
  )
}
