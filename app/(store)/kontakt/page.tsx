export default function KontaktPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">
            Kontakt Oss
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Vi er her for å hjelpe deg med alle dine spørsmål og henvendelser.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="luxury-card p-8">
            <h2 className="font-serif text-2xl text-primary mb-6">Send oss en melding</h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Navn
                </label>
                <input
                  type="text"
                  id="name"
                  className="luxury-input w-full"
                  placeholder="Ditt navn"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  E-post
                </label>
                <input
                  type="email"
                  id="email"
                  className="luxury-input w-full"
                  placeholder="din.epost@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">
                  Emne
                </label>
                <input
                  type="text"
                  id="subject"
                  className="luxury-input w-full"
                  placeholder="Hva gjelder henvendelsen?"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Melding
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="luxury-input w-full resize-none"
                  placeholder="Skriv din melding her..."
                />
              </div>

              <button type="submit" className="luxury-button w-full">
                Send Melding
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Store Information */}
            <div className="luxury-card p-8">
              <h2 className="font-serif text-2xl text-primary mb-6">Besøk vår butikk</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Adresse:</strong><br />
                  Storgata 1<br />
                  0155 Oslo
                </p>
                <p>
                  <strong className="text-foreground">Åpningstider:</strong><br />
                  Mandag - Fredag: 10:00 - 18:00<br />
                  Lørdag: 10:00 - 16:00<br />
                  Søndag: Stengt
                </p>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="luxury-card p-8">
              <h2 className="font-serif text-2xl text-primary mb-6">Kontaktinformasjon</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Telefon:</strong><br />
                  +47 22 00 00 00
                </p>
                <p>
                  <strong className="text-foreground">E-post:</strong><br />
                  kundeservice@kiil.no
                </p>
                <p>
                  <strong className="text-foreground">Kundeservice:</strong><br />
                  Mandag - Fredag: 09:00 - 17:00
                </p>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="luxury-card p-8">
              <h2 className="font-serif text-2xl text-primary mb-4">Hastehenvendelser</h2>
              <p className="text-muted-foreground">
                For hastehenvendelser utenfor våre åpningstider, 
                vennligst send en e-post til haster@kiil.no
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
