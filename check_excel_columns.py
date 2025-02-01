import openpyxl

EXCEL_FILE = "products.xlsx"

# Excel-Datei laden
workbook = openpyxl.load_workbook(EXCEL_FILE)
sheet = workbook.active

# Anzahl der Spalten in der ersten Zeile zählen
columns = [cell.value for cell in sheet[1] if cell.value is not None]

print(f"🟢 Die Excel-Datei hat {len(columns)} Spalten.")
print("📌 Spaltennamen in der Excel-Datei:")
print(columns)
