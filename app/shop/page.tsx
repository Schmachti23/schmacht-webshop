"use client";

import { useEffect, useState } from "react";

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [groupedProducts, setGroupedProducts] = useState<Record<string, any[]>>({});
  const [productKeys, setProductKeys] = useState<string[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<any | null>(null);

  // Produkte abrufen & gruppieren
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error(`Fehler beim Laden: ${res.statusText}`);
        const data = await res.json();
        console.log("✅ API Antwort erhalten:", data);

        // Gruppierung nach `Parent_Child`
        const grouped = data.reduce((acc, product) => {
          if (!acc[product.Parent_Child]) {
            acc[product.Parent_Child] = [];
          }
          acc[product.Parent_Child].push(product);
          return acc;
        }, {} as Record<string, any[]>);

        console.log("📌 Gruppierte Produkte:", grouped);
        setGroupedProducts(grouped);
        setProductKeys(Object.keys(grouped));
      } catch (error) {
        console.error("❌ Fehler beim Abrufen der Produkte:", error);
      }
    }

    fetchProducts();
  }, []);

  // Sicherstellen, dass immer eine Variante existiert
  useEffect(() => {
    if (productKeys.length > 0 && !selectedVariant) {
      const firstGroup = groupedProducts[productKeys[0]];
      if (firstGroup && firstGroup.length > 0) {
        setSelectedVariant(firstGroup[0]);
      }
    }
  }, [productKeys, groupedProducts, selectedVariant]);

  // Falls keine Produkte geladen wurden
  if (productKeys.length === 0) {
    return <p className="text-gray-500">Keine Produkte verfügbar.</p>;
  }

  const firstGroupKey = productKeys[0];
  const groupVariants = groupedProducts[firstGroupKey] || [];

  if (groupVariants.length === 0) {
    console.error("❌ Keine Produkte in dieser Gruppe gefunden!");
    return <p className="text-red-500">Fehler: Keine Produkte in dieser Gruppe.</p>;
  }

  // Dropdown-Auswahl
  function handleSelectionChange(sku: string) {
    const foundVariant = groupVariants.find((v) => v.SKU === sku);
    if (foundVariant) {
      setSelectedVariant(foundVariant);
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Unser Shop</h1>

      {/* GRID MIT 4 CONTAINERN */}
      <div className="grid grid-cols-4 gap-6">
        {/* Produktbild */}
        <div>
          {selectedVariant?.Bild_1 ? (
            <img src={selectedVariant.Bild_1} alt="Produktbild" className="w-full h-80 object-contain" />
          ) : (
            <p className="text-red-500">Kein Bild verfügbar</p>
          )}
        </div>

        {/* Variantenbild */}
        <div>
          {selectedVariant?.Bild_2 ? (
            <img src={selectedVariant.Bild_2} alt="Variantenbild" className="w-full h-80 object-contain" />
          ) : (
            <p className="text-gray-500">Keine Variante verfügbar</p>
          )}
        </div>

        {/* Beschreibung + Dropdowns */}
        <div>
          <h2 className="text-xl font-semibold">{selectedVariant?.Name || "Kein Name"}</h2>
          <p className="text-gray-600">{selectedVariant?.Beschreibung_1 || "Keine Beschreibung verfügbar"}</p>

          {/* Varianten Dropdown */}
          <div className="mt-4">
            <label className="block font-medium">Variante:</label>
            <select
              className="border p-2 rounded w-full"
              value={selectedVariant?.SKU || ""}
              onChange={(e) => handleSelectionChange(e.target.value)}
            >
              {groupVariants.length > 0 ? (
                groupVariants.map((v) => (
                  <option key={v.SKU} value={v.SKU}>
                    {v.Größe} - {v.Tragegriff}
                  </option>
                ))
              ) : (
                <option disabled>Keine Varianten verfügbar</option>
              )}
            </select>
          </div>
        </div>

        {/* Kaufen-Button */}
        <div className="flex flex-col items-center justify-center">
          {selectedVariant ? (
            <>
              <p className="text-lg font-semibold">Preis: {selectedVariant.Preis} EUR</p>
              <p className="text-gray-500">Lagerbestand: {selectedVariant.Lagerbestand}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                In den Warenkorb
              </button>
            </>
          ) : (
            <p className="text-gray-500">Keine Variante ausgewählt</p>
          )}
        </div>
      </div>
    </div>
  );
}
