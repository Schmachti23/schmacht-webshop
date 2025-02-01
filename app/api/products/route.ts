import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Datenbankverbindung öffnen
async function getDatabase() {
  return open({
    filename: "./products.db", // Stelle sicher, dass die Datenbank hier liegt
    driver: sqlite3.Database,
  });
}

// Produkte abrufen
export async function GET() {
  try {
    const db = await getDatabase();

    // Holen wir uns alle Produkt-Daten
    const products = await db.all("SELECT * FROM products");

    console.log("✅ API liefert Produkte:", products);

    await db.close();
    return NextResponse.json(products);
  } catch (error) {
    console.error("❌ Fehler in API:", error);
    return NextResponse.json({ error: "Fehler beim Abrufen der Produkte" }, { status: 500 });
  }
}
