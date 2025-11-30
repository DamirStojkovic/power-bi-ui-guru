import { createContext, useContext, useState, ReactNode } from "react";

export type TimePeriod = "day" | "week" | "month" | "year";

interface DateRange {
  from: Date;
  to: Date;
}

interface DashboardContextType {
  timePeriod: TimePeriod;
  setTimePeriod: (period: TimePeriod) => void;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  comparisonMode: boolean;
  setComparisonMode: (enabled: boolean) => void;
  comparisonDateRange: DateRange;
  setComparisonDateRange: (range: DateRange) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("month");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(new Date().setDate(1)), // First day of current month
    to: new Date(),
  });
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparisonDateRange, setComparisonDateRange] = useState<DateRange>({
    from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
    to: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
  });

  return (
    <DashboardContext.Provider
      value={{
        timePeriod,
        setTimePeriod,
        dateRange,
        setDateRange,
        comparisonMode,
        setComparisonMode,
        comparisonDateRange,
        setComparisonDateRange,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
