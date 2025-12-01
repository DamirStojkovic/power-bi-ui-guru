# Power BI Setup Guide - Berlin Döner Dashboard

## Trin 1: Importer Theme Filen

1. Åbn **Power BI Desktop**
2. Gå til **View** tab i toppen
3. Klik på **Themes** dropdown
4. Vælg **Browse for themes**
5. Find og vælg `berlin-doner-powerbi-theme.json`
6. Klik **Open**

✅ Dit dashboard har nu Berlin Döner's brandfarver og styling!

---

## Trin 2: Forbind Dine Data

### Option A: Import fra CSV Filer
1. Klik **Get data** → **Text/CSV**
2. Importer alle CSV filer fra `data-templates` mappen:
   - `stores-data.csv`
   - `sales-channels.csv`
   - `products.csv`
   - `employees.csv`
3. Klik **Transform Data** for at rense og formatere data

### Option B: Forbind til Database
1. Klik **Get data** → Vælg din database type (SQL Server, PostgreSQL, etc.)
2. Indtast connection details
3. Vælg relevante tabeller

### Data Struktur Krav

**Stores Table:**
- Store Name (Text)
- Date (Date)
- Revenue (Currency)
- Number of Orders (Whole Number)
- Contribution Margin (Currency)
- Contribution Margin Ratio (Percentage)
- Wage Cost (Currency)
- Wage Percentage (Percentage)
- COGS (Currency)
- Coverage Degree (Decimal Number)

**Sales Channels Table:**
- Channel (Text: "Online", "Butik", "Wolt")
- Store Name (Text)
- Date (Date)
- Revenue (Currency)
- Number of Orders (Whole Number)
- Profit (Currency)
- Growth Rate (Percentage)
- Average Order Value (Currency)

**Products Table:**
- Product Name (Text)
- Store Name (Text)
- Date (Date)
- Revenue (Currency)
- Quantity Sold (Whole Number)
- Contribution Margin (Currency)
- Contribution Margin Ratio (Percentage)
- Category (Text)

**Employees Table:**
- Employee Name (Text)
- Store Name (Text)
- Date (Date)
- Shift Start (Time)
- Shift End (Time)
- Hours Worked (Decimal)
- Salary Cost (Currency)
- Revenue Generated (Currency)
- Bags Upsold (Whole Number)
- Ketchup Upsold (Whole Number)
- Chili Mayo Upsold (Whole Number)
- Truffle Mayo Upsold (Whole Number)
- Desserts Upsold (Whole Number)
- Total Upselling (Whole Number)

---

## Trin 3: Opret DAX Measures

1. Højreklik i **Fields** pane
2. Vælg **New measure**
3. Kopier DAX formler fra `dax-formulas.md`
4. Test hver measure ved at tilføje den til en Card visualization

**Vigtige measures at starte med:**
- Total Revenue
- Coverage Degree
- YoY Growth
- Contribution Margin Ratio

---

## Trin 4: Byg de 6 Dashboard Sider

### Side 1: Executive Overview 📊

**Visualiseringer at tilføje:**

1. **KPI Cards** (øverst):
   - Total Revenue (Large number with YoY comparison)
   - Number of Orders
   - Coverage Degree
   - Average Order Value

2. **Gauge Charts** (3 stk):
   - Contribution Margin Ratio (Target: 55%)
   - Wage Percentage (Target: 18%)
   - Coverage Degree (Target: 1.5)

3. **Bar Chart - Top 5 Products**:
   - Y-axis: Product Name
   - X-axis: Revenue
   - Sort: Descending
   
4. **Matrix Heatmap - Store x Day Performance**:
   - Rows: Store Name
   - Columns: Date (Days)
   - Values: Revenue
   - Conditional formatting: Gradient (low = white, high = gold)

5. **Line Chart - YoY Comparison**:
   - X-axis: Month
   - Y-axis: Revenue
   - Legend: Current Year vs Last Year

---

### Side 2: Store Comparison 🏪

**Visualiseringer:**

1. **Cards** - En per butik (Reberbansgade, Sjællandsgade, Friis):
   - Total Revenue
   - YoY Growth %
   - Coverage Degree

2. **Clustered Column Chart - Revenue per Store**:
   - X-axis: Store Name
   - Y-axis: Revenue
   - Color: Store-specifikke farver

3. **Line Chart - Trend Over Time**:
   - X-axis: Date
   - Y-axis: Revenue
   - Legend: Store Name (3 lines)

4. **Table - Detailed Metrics**:
   - Store Name
   - Revenue
   - Orders
   - Contribution Margin %
   - Wage %
   - Coverage Degree

---

### Side 3: Sales Channel Analysis 📱

**Visualiseringer:**

1. **Donut Chart - Revenue by Channel**:
   - Legend: Channel (Online, Butik, Wolt)
   - Values: Revenue
   - Colors: Kanal-specifikke farver

2. **Clustered Bar Chart - Channel Performance**:
   - Y-axis: Channel
   - X-axis: Revenue
   - Legend: Store Name

3. **Cards - Per Channel**:
   - Channel Revenue
   - Channel Profit
   - Growth Rate

4. **Line + Column Chart - Channel Growth**:
   - X-axis: Month
   - Column: Revenue
   - Line: Growth Rate %

---

### Side 4: Product Performance 🍽️

**Visualiseringer:**

1. **Bar Chart - Top 10 Products**:
   - Y-axis: Product Name
   - X-axis: Revenue
   - Sort: Descending

2. **Bar Chart - Worst 5 Products**:
   - Y-axis: Product Name
   - X-axis: Revenue
   - Sort: Ascending

3. **Table - Product Details**:
   - Product Name
   - Category
   - Revenue
   - Quantity Sold
   - Contribution Margin %

4. **Treemap - Products by Category**:
   - Group: Category
   - Values: Revenue
   - Details: Product Name

---

### Side 5: Operational Insight ⏰

**Visualiseringer:**

1. **Column Chart - Orders by Hour**:
   - X-axis: Hour (0-23)
   - Y-axis: Number of Orders
   - Highlight peak hours

2. **Line Chart - Revenue by Hour**:
   - X-axis: Hour
   - Y-axis: Revenue

3. **Matrix - Day x Hour Heatmap**:
   - Rows: Day of Week
   - Columns: Hour
   - Values: Revenue
   - Conditional formatting

4. **Cards**:
   - Peak Hour
   - Orders Per Hour (average)
   - Busiest Day

---

### Side 6: Employee Analysis 👥

**⚠️ VIGTIGT: Denne side skal have Row-Level Security (RLS)**

**Visualiseringer:**

1. **Table - Employee Performance**:
   - Employee Name
   - Hours Worked
   - Salary Cost
   - Revenue Generated
   - Revenue per Hour

2. **Stacked Column Chart - Upselling by Employee**:
   - X-axis: Employee Name
   - Y-axis: Count
   - Legend: Upsell Type (Bags, Ketchup, Chili Mayo, Truffle Mayo, Desserts)

3. **Gauge - Upselling Target Achievement**:
   - Value: Total Upselling
   - Target: Monthly Goal (definer selv)

4. **Cards**:
   - Total Hours Worked
   - Total Salary Cost
   - Average Upselling Rate

**Opsæt Row-Level Security:**
1. Gå til **Modeling** tab
2. Klik **Manage roles**
3. Opret rolle: "Leadership"
4. DAX filter: `'Employees'[Access Level] = "Admin"`
5. Test med **View as roles**

---

## Trin 5: Tilføj Interaktivitet

### Filters og Slicers

Tilføj følgende **Slicers** til alle sider:

1. **Date Range Slicer** (øverst på hver side):
   - Type: Between
   - Field: Date
   - Style: Dropdown eller Slider

2. **Time Period Slicer**:
   - Type: List
   - Values: "Day", "Week", "Month", "Year"
   - Single select

3. **Store Slicer** (hvor relevant):
   - Type: Dropdown
   - Field: Store Name
   - Multi-select

### Drillthrough Pages

Opret drillthrough funktionalitet:
1. Højreklik på en visualisering
2. Vælg **Drillthrough**
3. Konfigurer mål-side

**Anbefalede Drillthrough:**
- Fra Executive Overview → Store Comparison (ved klik på store)
- Fra Store Comparison → Product Performance (ved klik på produkt)
- Fra Product Performance → Operational Insight (ved klik på tid)

---

## Trin 6: Styling Tips

### Generelle Design Principper

✅ **Gør:**
- Brug white space til at adskille sektioner
- Hold konsistent spacing mellem visualiseringer
- Brug Berlin Gold (#FFCC00) til highlights og primary elements
- Brug sort tekst på lys baggrund for læsbarhed

❌ **Undgå:**
- For mange farver i samme visualisering
- Overload af data i ét view
- Uklare labels og titler

### Visual Formatting

For hver visualisering:
1. **Title**: Tydelig, beskrivende titel
2. **Background**: Hvid eller transparent
3. **Border**: Subtil grå kant (fra theme)
4. **Padding**: 10-15px omkring content
5. **Font**: Nunito Sans (fra theme)

---

## Trin 7: Test og Publicer

### Testing Checklist

- [ ] Alle DAX measures viser korrekte værdier
- [ ] YoY sammenligninger fungerer
- [ ] Slicers filtrerer korrekt på tværs af sider
- [ ] Theme farver er anvendt konsistent
- [ ] Medarbejder-side har RLS aktiveret
- [ ] Mobile layout er responsiv

### Publicering

1. **Gem din .pbix fil** lokalt som backup
2. Klik **Publish** i toppen af Power BI Desktop
3. Vælg workspace i Power BI Service
4. Konfigurer scheduled refresh (hvis forbundet til database)
5. Del dashboard med relevante brugere

---

## Næste Skridt

Efter du har bygget dashboardet:

1. **Konfigurer Data Refresh**:
   - Daglig opdatering kl. 06:00
   - Email notifikation ved fejl

2. **Opret Alerts**:
   - Coverage Degree under 1.3
   - YoY Growth negativ

3. **Byg Mobile View**:
   - Tilpas layout til mobile enheder
   - Test på tablet og telefon

4. **Documentation**:
   - Dokumenter data sources
   - Opret user guide til kollegaer

---

## Support og Ressourcer

- **Power BI Documentation**: https://docs.microsoft.com/power-bi/
- **DAX Guide**: https://dax.guide/
- **Community Forum**: https://community.powerbi.com/

## Kontakt

Hvis du har spørgsmål til implementeringen, så kontakt dit support team.

---

**Version:** 1.0  
**Sidst opdateret:** December 2024  
**For:** Berlin Döner Aalborg
