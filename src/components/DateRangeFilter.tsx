import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { da } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useDashboard, TimePeriod } from "@/contexts/DashboardContext";

const periods: { label: string; value: TimePeriod }[] = [
  { label: "Dag", value: "day" },
  { label: "Uge", value: "week" },
  { label: "Måned", value: "month" },
  { label: "År", value: "year" },
];

export const DateRangeFilter = () => {
  const { 
    timePeriod, 
    setTimePeriod, 
    dateRange, 
    setDateRange, 
    comparisonMode, 
    setComparisonMode,
    comparisonDateRange,
    setComparisonDateRange 
  } = useDashboard();
  const [date, setDate] = useState<DateRange | undefined>({
    from: dateRange.from,
    to: dateRange.to,
  });
  const [comparisonDate, setComparisonDate] = useState<DateRange | undefined>({
    from: comparisonDateRange.from,
    to: comparisonDateRange.to,
  });

  const handleDateSelect = (range: DateRange | undefined) => {
    setDate(range);
    if (range?.from && range?.to) {
      setDateRange({ from: range.from, to: range.to });
    }
  };

  const handleComparisonDateSelect = (range: DateRange | undefined) => {
    setComparisonDate(range);
    if (range?.from && range?.to) {
      setComparisonDateRange({ from: range.from, to: range.to });
    }
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Period Pills */}
      <div className="flex gap-2">
        {periods.map((period) => (
          <button
            key={period.value}
            onClick={() => setTimePeriod(period.value)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
              "hover-lift",
              timePeriod === period.value
                ? "bg-primary text-primary-foreground shadow-lg"
                : "glass text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            {period.label}
          </button>
        ))}
      </div>

      {/* Comparison Mode Toggle */}
      <button
        onClick={() => setComparisonMode(!comparisonMode)}
        className={cn(
          "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover-lift",
          comparisonMode
            ? "bg-gold text-brand-black shadow-lg"
            : "glass text-muted-foreground hover:text-foreground hover:bg-muted/50"
        )}
      >
        Sammenlign
      </button>

      {/* Date Range Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "glass border-border/50 justify-start text-left font-normal hover-lift",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd. MMM", { locale: da })} -{" "}
                  {format(date.to, "dd. MMM yyyy", { locale: da })}
                </>
              ) : (
                format(date.from, "dd. MMM yyyy", { locale: da })
              )
            ) : (
              <span>Vælg periode</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 glass backdrop-blur-xl border-border/50 z-50" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
            locale={da}
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>

      {/* Comparison Date Range Picker */}
      {comparisonMode && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "glass border-gold/50 justify-start text-left font-normal hover-lift",
                !comparisonDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-gold" />
              {comparisonDate?.from ? (
                comparisonDate.to ? (
                  <>
                    {format(comparisonDate.from, "dd. MMM", { locale: da })} -{" "}
                    {format(comparisonDate.to, "dd. MMM yyyy", { locale: da })}
                  </>
                ) : (
                  format(comparisonDate.from, "dd. MMM yyyy", { locale: da })
                )
              ) : (
                <span>Sammenligningsperiode</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 glass backdrop-blur-xl border-border/50 z-50" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={comparisonDate?.from}
              selected={comparisonDate}
              onSelect={handleComparisonDateSelect}
              numberOfMonths={2}
              locale={da}
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
