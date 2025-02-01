import sqlite3
import openpyxl

DB_PATH = "C:/Users/User/schmacht-webshop/products.db"
EXCEL_PATH = "C:/Users/User/schmacht-webshop/products.xlsx"

def create_products_table(cursor):
    """Erstellt die Tabelle products, falls sie nicht existiert."""
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Parent_Child TEXT NOT NULL,
        Marke TEXT,
        Name TEXT NOT NULL,
        Beschreibung_1 TEXT,
        Beschreibung_2 TEXT,
        Beschreibung_3 TEXT,
        Beschreibung_4 TEXT,
        Beschreibung_5 TEXT,
        Beschreibung_6 TEXT,
        Beschreibung_7 TEXT,
        Beschreibung_8 TEXT,
        Beschreibung_9 TEXT,
        Beschreibung_10 TEXT,
        Beschreibung_11 TEXT,
        Beschreibung_12 TEXT,
        Beschreibung_13 TEXT,
        Beschreibung_14 TEXT,
        Beschreibung_15 TEXT,
        Beschreibung_16 TEXT,
        Beschreibung_17 TEXT,
        Kategorie TEXT,
        Größe TEXT,
        Tragegriff TEXT,
        ASIN TEXT,
        SKU TEXT,
        EAN TEXT,
        Lagerbestand INTEGER DEFAULT 0,
        Preis REAL,
        Bild_1 TEXT,
        Bild_2 TEXT,
        Bild_3 TEXT,
        Bild_4 TEXT,
        Bild_5 TEXT,
        Bild_6 TEXT,
        Bild_7 TEXT,
        Bild_8 TEXT,
        Bild_9 TEXT,
        Bild_10 TEXT,
        Bild_11 TEXT,
        Bild_12 TEXT,
        Bild_13 TEXT,
        Bild_14 TEXT,
        Bild_15 TEXT,
        Bild_16 TEXT,
        Bild_17 TEXT,
        Bild_18 TEXT,
        Bild_19 TEXT,
        Bild_20 TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

def import_from_excel(cursor):
    """Importiert Produktdaten aus der Excel-Datei in die Datenbank."""
    workbook = openpyxl.load_workbook(EXCEL_PATH)
    sheet = workbook.active

    header = [cell.value for cell in sheet[1]]  # Spaltennamen aus der ersten Zeile
    parent_data = None  # Speichert die letzte Parent-Zeile

    for row in sheet.iter_rows(min_row=2, values_only=True):
        if all(value is None for value in row[:3]):  
            print(f"❌ Komplett leere Zeile übersprungen: {row}")
            continue

        # Parent-Zeile speichern, falls gefunden
        if row[2] == "Parent":
            parent_data = row
            print(f"🔹 Parent-Zeile gespeichert: {row}")

        # Falls es ein Child ist, fehlende Werte durch Parent-Werte ersetzen
        elif row[2] == "Child" and parent_data:
            row = tuple(
                child_value if child_value is not None else parent_value
                for child_value, parent_value in zip(row, parent_data)
            )
            print(f"🔹 Child-Zeile ergänzt mit Parent-Werten: {row}")

        cursor.execute(f"""
        INSERT INTO products (
            {', '.join(header)}
        ) VALUES ({', '.join(['?' for _ in header])});
        """, row)

    print("✅ Alle Daten wurden erfolgreich aus der Excel-Datei importiert.")

def create_and_import_tables():
    """Löscht alte Tabellen, erstellt sie neu und importiert Daten aus der Excel-Datei."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Alte Tabelle löschen
    cursor.execute("DROP TABLE IF EXISTS products;")
    print("✅ Alte Tabelle 'products' wurde gelöscht.")

    # Neue Tabelle erstellen
    create_products_table(cursor)
    print("✅ Neue Tabelle 'products' wurde erstellt.")

    # Excel-Daten importieren
    import_from_excel(cursor)

    conn.commit()
    conn.close()
    print("✅ Alle Daten wurden erfolgreich importiert.")

def check_tables():
    """Zeigt die Inhalte der Tabellen an."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    print("\n📌 Tabellen in der Datenbank:")
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    for table in cursor.fetchall():
        print(f"- {table[0]}")

    print("\n📌 Inhalt der Tabelle 'products':")
    cursor.execute("SELECT * FROM products;")
    for row in cursor.fetchall():
        print(row)

    conn.close()

import sys

if __name__ == "__main__":
    """Ermöglicht die Steuerung über das Terminal."""
    if len(sys.argv) > 1:
        command = sys.argv[1]

        if command == "create_and_import_tables":
            create_and_import_tables()
        elif command == "check_tables":
            check_tables()
        else:
            print(f"❌ Unbekannter Befehl: {command}")
    else:
        print("🔹 Bitte einen Befehl angeben: create_and_import_tables, check_tables")
