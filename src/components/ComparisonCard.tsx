import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonCardProps {
  title: string;
  currentValue: string;
  currentLabel: string;
  comparisonValue: string;
  comparisonLabel: string;
  change: number;
  icon?: React.ReactNode;
}

export const ComparisonCard = ({
  title,
  currentValue,
  currentLabel,
  comparisonValue,
  comparisonLabel,
  change,
  icon,
}: ComparisonCardProps) => {
  const getChangeColor = () => {
    if (change > 0) return "text-success";
    if (change < 0) return "text-error";
    return "text-muted-foreground";
  };

  const getChangeIcon = () => {
    if (change > 0) return <TrendingUp className="w-5 h-5" />;
    if (change < 0) return <TrendingDown className="w-5 h-5" />;
    return <Minus className="w-5 h-5" />;
  };

  return (
    <Card className="glass-card p-6 hover-lift">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && <div className="text-gold">{icon}</div>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Current Period */}
        <div>
          <div className="text-2xl font-bold text-foreground mb-1">
            {currentValue}
          </div>
          <div className="text-xs text-muted-foreground">{currentLabel}</div>
        </div>

        {/* Comparison Period */}
        <div>
          <div className="text-2xl font-bold text-gold/80 mb-1">
            {comparisonValue}
          </div>
          <div className="text-xs text-muted-foreground">{comparisonLabel}</div>
        </div>
      </div>

      {/* Change Indicator */}
      <div className={cn("flex items-center gap-2 mt-4 pt-4 border-t border-border/50", getChangeColor())}>
        {getChangeIcon()}
        <span className="text-lg font-semibold">
          {change > 0 ? "+" : ""}{change.toFixed(1)}%
        </span>
        <span className="text-sm text-muted-foreground ml-auto">ændring</span>
      </div>
    </Card>
  );
};
