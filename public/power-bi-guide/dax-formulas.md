# DAX Formler til Berlin Döner Dashboard

## Grundlæggende Målinger (Measures)

### Total Omsætning
```dax
Total Revenue = SUM('Sales'[Revenue])
```

### Antal Ordrer
```dax
Total Orders = COUNT('Sales'[Order ID])
```

### Gennemsnitlig Ordre Værdi
```dax
Average Order Value = DIVIDE([Total Revenue], [Total Orders], 0)
```

## Dækningsgrad (Coverage Degree)

### DB (Contribution Margin)
```dax
Contribution Margin = SUM('Sales'[Revenue]) - SUM('Sales'[COGS])
```

### DB% (Contribution Margin Ratio)
```dax
Contribution Margin Ratio = 
DIVIDE(
    [Contribution Margin],
    [Total Revenue],
    0
) * 100
```

### Lønomkostninger
```dax
Total Wage Cost = SUM('Employees'[Salary Cost])
```

### Lønprocent
```dax
Wage Percentage = 
DIVIDE(
    [Total Wage Cost],
    [Total Revenue],
    0
) * 100
```

### Dækningsgrad
```dax
Coverage Degree = 
DIVIDE(
    [Contribution Margin],
    [Total Wage Cost],
    0
)
```

## Year-over-Year (YoY) Sammenligninger

### Omsætning Sidste År (SPLY)
```dax
Revenue SPLY = 
CALCULATE(
    [Total Revenue],
    SAMEPERIODLASTYEAR('Calendar'[Date])
)
```

### YoY Vækst
```dax
YoY Growth = 
DIVIDE(
    [Total Revenue] - [Revenue SPLY],
    [Revenue SPLY],
    0
) * 100
```

### YoY Vækst Indikator
```dax
YoY Growth Icon = 
IF(
    [YoY Growth] > 0,
    "▲ " & FORMAT([YoY Growth], "0.0") & "%",
    "▼ " & FORMAT([YoY Growth], "0.0") & "%"
)
```

## Produkt Performance

### Top 5 Produkter
```dax
Top 5 Products = 
CALCULATE(
    [Total Revenue],
    TOPN(
        5,
        ALL('Products'[Product Name]),
        [Total Revenue],
        DESC
    )
)
```

### Produkt DB per Enhed
```dax
Product Margin Per Unit = 
DIVIDE(
    [Contribution Margin],
    SUM('Products'[Quantity Sold]),
    0
)
```

## Medarbejder Performance

### Omsætning per Medarbejder per Vagt
```dax
Revenue Per Employee Shift = 
DIVIDE(
    [Total Revenue],
    DISTINCTCOUNT('Employees'[Employee Name]),
    0
)
```

### Total Upselling
```dax
Total Upselling = 
SUM('Employees'[Bags Upsold]) +
SUM('Employees'[Ketchup Upsold]) +
SUM('Employees'[Chili Mayo Upsold]) +
SUM('Employees'[Truffle Mayo Upsold]) +
SUM('Employees'[Desserts Upsold])
```

### Upselling Rate
```dax
Upselling Rate = 
DIVIDE(
    [Total Upselling],
    [Total Orders],
    0
) * 100
```

### Upselling Target Achievement
```dax
Upselling Target Achievement = 
VAR UpsellingTarget = 50  // Juster efter behov
RETURN
DIVIDE(
    [Total Upselling],
    UpsellingTarget,
    0
) * 100
```

## Operational Insights

### Ordrer per Time
```dax
Orders Per Hour = 
DIVIDE(
    [Total Orders],
    DISTINCTCOUNT('Sales'[Hour]),
    0
)
```

### Peak Time Indikator
```dax
Peak Hour = 
CALCULATE(
    MAX('Sales'[Hour]),
    TOPN(
        1,
        ALL('Sales'[Hour]),
        [Total Orders],
        DESC
    )
)
```

## Kanal Performance

### Online Omsætning
```dax
Online Revenue = 
CALCULATE(
    [Total Revenue],
    'Sales'[Channel] = "Online"
)
```

### Butik Omsætning
```dax
Store Revenue = 
CALCULATE(
    [Total Revenue],
    'Sales'[Channel] = "Butik"
)
```

### Wolt Omsætning
```dax
Wolt Revenue = 
CALCULATE(
    [Total Revenue],
    'Sales'[Channel] = "Wolt"
)
```

## Tidsdimensioner

Husk at oprette en separat Calendar-tabel for bedre tid-baserede analyser:

```dax
Calendar = 
ADDCOLUMNS(
    CALENDAR(DATE(2023,1,1), DATE(2025,12,31)),
    "Year", YEAR([Date]),
    "Month", MONTH([Date]),
    "MonthName", FORMAT([Date], "MMMM"),
    "Quarter", "Q" & QUARTER([Date]),
    "WeekNum", WEEKNUM([Date]),
    "DayOfWeek", WEEKDAY([Date]),
    "DayName", FORMAT([Date], "DDDD")
)
```

## Tips til Brug

1. **Opret alle measures i en separat "Measures" tabel** for bedre organisation
2. **Brug DIVIDE() funktionen** i stedet for "/" for at undgå fejl ved division med nul
3. **Formater measures korrekt** (valuta, procent, heltal) via Format-indstillinger
4. **Test YoY beregninger** med forskellige tidsperioder
5. **Brug variabler (VAR)** til komplekse beregninger for bedre performance

## Næste Skridt

Efter at have oprettet disse measures:
1. Forbind dem til dine visualiseringer
2. Test beregningerne med dine faktiske data
3. Juster målene efter jeres specifikke forretningskrav
4. Opret bookmarks til forskellige views
