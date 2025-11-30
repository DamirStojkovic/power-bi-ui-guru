import { TrendingUp, Users, DollarSign, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ComparisonCard } from "@/components/ComparisonCard";
import { useDashboard } from "@/contexts/DashboardContext";
import { format } from "date-fns";
import { da } from "date-fns/locale";

const stats = [
  { label: "Total Omsætning", value: "2,4M kr", change: "+12.5%", icon: DollarSign },
  { label: "Ordrer i dag", value: "347", change: "+8.2%", icon: Package },
  { label: "Gennemsnitlig ordre", value: "142 kr", change: "+5.1%", icon: TrendingUp },
  { label: "Aktive medarbejdere", value: "24", change: "+2", icon: Users },
];

const topProducts = [
  { name: "Kebab Classic", value: 4200, margin: 68 },
  { name: "Durum Box", value: 3800, margin: 72 },
  { name: "Falafel Bowl", value: 2900, margin: 75 },
  { name: "Chili Cheese", value: 2400, margin: 65 },
  { name: "Berlin Special", value: 2100, margin: 70 },
];

const gauges = [
  { label: "Lønprocent", value: 28, target: 30, color: "hsl(var(--gold))" },
  { label: "Vareforbrug", value: 32, target: 35, color: "hsl(var(--accent))" },
  { label: "Dækningsgrad", value: 68, target: 65, color: "hsl(var(--store-friis))" },
];

export const ExecutiveOverview = () => {
  const { comparisonMode, dateRange, comparisonDateRange } = useDashboard();

  return (
    <div className="space-y-6">
      {/* Stats Grid or Comparison Grid */}
      {comparisonMode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-scale-in">
          <ComparisonCard
            title="Total Omsætning"
            currentValue="2,4M kr"
            currentLabel={format(dateRange.from, "dd. MMM", { locale: da }) + " - " + format(dateRange.to, "dd. MMM", { locale: da })}
            comparisonValue="2,1M kr"
            comparisonLabel={format(comparisonDateRange.from, "dd. MMM", { locale: da }) + " - " + format(comparisonDateRange.to, "dd. MMM", { locale: da })}
            change={14.3}
            icon={<DollarSign className="w-5 h-5" />}
          />
          <ComparisonCard
            title="Ordrer i dag"
            currentValue="347"
            currentLabel={format(dateRange.from, "dd. MMM", { locale: da }) + " - " + format(dateRange.to, "dd. MMM", { locale: da })}
            comparisonValue="312"
            comparisonLabel={format(comparisonDateRange.from, "dd. MMM", { locale: da }) + " - " + format(comparisonDateRange.to, "dd. MMM", { locale: da })}
            change={11.2}
            icon={<Package className="w-5 h-5" />}
          />
          <ComparisonCard
            title="Gennemsnitlig ordre"
            currentValue="142 kr"
            currentLabel={format(dateRange.from, "dd. MMM", { locale: da }) + " - " + format(dateRange.to, "dd. MMM", { locale: da })}
            comparisonValue="135 kr"
            comparisonLabel={format(comparisonDateRange.from, "dd. MMM", { locale: da }) + " - " + format(comparisonDateRange.to, "dd. MMM", { locale: da })}
            change={5.2}
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <ComparisonCard
            title="Aktive medarbejdere"
            currentValue="24"
            currentLabel={format(dateRange.from, "dd. MMM", { locale: da }) + " - " + format(dateRange.to, "dd. MMM", { locale: da })}
            comparisonValue="22"
            comparisonLabel={format(comparisonDateRange.from, "dd. MMM", { locale: da }) + " - " + format(comparisonDateRange.to, "dd. MMM", { locale: da })}
            change={9.1}
            icon={<Users className="w-5 h-5" />}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-scale-in">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Card key={i} className="glass-card hover-lift border-border/30">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <h3 className="text-3xl font-bold text-foreground">{stat.value}</h3>
                      <p className="text-sm text-primary mt-2 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {stat.change}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {gauges.map((gauge, i) => (
          <Card key={i} className="glass-card hover-lift border-border/30">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">{gauge.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-32 flex items-center justify-center">
                <svg className="w-32 h-32 -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="hsl(var(--muted))"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke={gauge.color}
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${(gauge.value / 100) * 351.86} 351.86`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-foreground">{gauge.value}%</span>
                  <span className="text-xs text-muted-foreground">Target: {gauge.target}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Products Chart */}
      <Card className="glass-card border-border/30">
        <CardHeader>
          <CardTitle className="text-foreground">Top 5 Produkter</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} animationDuration={1000}>
                {topProducts.map((_, index) => (
                  <Cell key={`cell-${index}`} fill="hsl(var(--primary))" opacity={1 - index * 0.15} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
