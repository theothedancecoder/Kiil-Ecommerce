"use client";

import { useLanguage } from "@/lib/languageContext";

export default function KontaktPage() {
  const { t } = useLanguage();
  
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">
            {t("contact.title")}
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="luxury-card p-8">
            <h2 className="font-serif text-2xl text-primary mb-6">{t("contact.form.title")}</h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  {t("contact.form.name")}
                </label>
                <input
                  type="text"
                  id="name"
                  className="luxury-input w-full"
                  placeholder={t("contact.form.name.placeholder")}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  {t("contact.form.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  className="luxury-input w-full"
                  placeholder={t("contact.form.email.placeholder")}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">
                  {t("contact.form.subject")}
                </label>
                <input
                  type="text"
                  id="subject"
                  className="luxury-input w-full"
                  placeholder={t("contact.form.subject.placeholder")}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  {t("contact.form.message")}
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="luxury-input w-full resize-none"
                  placeholder={t("contact.form.message.placeholder")}
                />
              </div>

              <button type="submit" className="luxury-button w-full">
                {t("contact.form.submit")}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Store Information */}
            <div className="luxury-card p-8">
              <h2 className="font-serif text-2xl text-primary mb-6">{t("contact.store.title")}</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">{t("contact.store.address")}:</strong><br />
                  Storgata 1<br />
                  0155 Oslo
                </p>
                <p>
                  <strong className="text-foreground">{t("contact.store.hours")}:</strong><br />
                  {t("contact.store.weekdays")}<br />
                  {t("contact.store.saturday")}<br />
                  {t("contact.store.sunday")}
                </p>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="luxury-card p-8">
              <h2 className="font-serif text-2xl text-primary mb-6">{t("contact.info.title")}</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">{t("contact.info.phone")}:</strong><br />
                  +47 22 00 00 00
                </p>
                <p>
                  <strong className="text-foreground">{t("contact.info.email")}:</strong><br />
                  kundeservice@kiil.no
                </p>
                <p>
                  <strong className="text-foreground">{t("contact.info.support")}:</strong><br />
                  {t("contact.info.support.hours")}
                </p>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="luxury-card p-8">
              <h2 className="font-serif text-2xl text-primary mb-4">{t("contact.emergency.title")}</h2>
              <p className="text-muted-foreground">
                {t("contact.emergency.message")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
