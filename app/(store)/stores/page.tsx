"use client";

export default function StoresPage() {
  return (
    <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 font-montserrat text-[#212529] bg-background">
      <h1 className="text-3xl font-bold mb-6 tracking-widest uppercase text-[#212529]">MØBELBUTIKK LOKASJONER &amp; ÅPNINGSTIDER</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 tracking-widest uppercase text-[#212529]">OSLO</h2>
        <p>Karl Johan gate 31</p>
        <p>Telefon: 224-26-346</p>
        <p>E-post: <a href="mailto:oslo@kiil.no" className="text-accent hover:underline">oslo@kiil.no</a></p>

        <h3 className="text-xl font-semibold mt-4 mb-1 tracking-widest uppercase text-[#212529]">BUTIKKENS ÅPNINGSTIDER</h3>
        <ul className="list-disc list-inside">
          <li>Mandag - Fredag : 09:00 - 17:00</li>
          <li>Torsdag: 09:00 - 18:00</li>
          <li>Lørdag : 10:00 - 16:00</li>
          <li>Søndag: Stengt</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2 tracking-widest uppercase text-[#212529]">GJØVIK</h2>
        <p>Huntonstranda 5</p>
        <p>Telefon: 906-44-095</p>
        <p>E-post: <a href="mailto:gjorvik@kiil.no" className="text-accent hover:underline">gjorvik@kiil.no</a></p>

        <h3 className="text-xl font-semibold mt-4 mb-1 tracking-widest uppercase text-[#212529]">BUTIKKENS ÅPNINGSTIDER</h3>
        <ul className="list-disc list-inside">
          <li>Mandag - Fredag : 10:00 - 17:00</li>
          <li>Torsdag: 10:00 - 19:00</li>
          <li>Lørdag : 10:00 - 16:00</li>
          <li>Søndag: Stengt</li>
        </ul>
      </section>
    </main>
  );
}
