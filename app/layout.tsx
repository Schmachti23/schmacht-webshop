// ✅ Next.js erwartet eine Root-Komponente namens `RootLayout`
"use client";

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Schmacht Webshop</title>
      </head>
      <body className="font-sans bg-white text-black">
        {/* Header */}
        <header className="sticky top-0 z-50 flex justify-between items-center p-4 bg-white border-b border-gray-300">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img src="/logo_schriftzug.png" alt="Schmacht Logo" className="w-32 h-auto" />
          </a>

          {/* Slogan */}
          <p className="text-xl italic text-black text-center font-serif flex-1">
            Schmacht dein Ding, bring Ordnung in dein Leben
          </p>

          {/* Navigation */}
          <nav className="flex gap-4">
            <a href="/shop" className="text-gray-800 font-bold hover:underline">Shop</a>
            <a href="/konto" className="text-gray-800 font-bold hover:underline">Konto</a>
            <a href="/warenkorb" className="text-gray-800 font-bold hover:underline">Warenkorb</a>
            <a href="/kasse" className="text-gray-800 font-bold hover:underline">Kasse</a>
          </nav>
        </header>

        {/* Main Content */}
        <main className="min-h-[70vh] p-5">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-100 p-5 text-center border-t border-gray-300">
          <a href="/impressum" className="mx-4 text-gray-700 hover:underline">Impressum</a>
          <a href="/agb" className="mx-4 text-gray-700 hover:underline">AGB</a>
          <a href="/widerruf" className="mx-4 text-gray-700 hover:underline">Widerrufsbelehrung</a>
          <p className="mt-2 text-gray-600 text-sm">
            © {new Date().getFullYear()} Schmacht - Alle Rechte vorbehalten.
          </p>
        </footer>
      </body>
    </html>
  );
}
