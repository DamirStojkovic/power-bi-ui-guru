import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const stores = [
  {
    name: "Reberbansgade",
    revenue: "842K kr",
    change: "+15.2%",
    positive: true,
    margin: 68,
    orders: 1420,
    color: "hsl(var(--store-reberbansgade))",
  },
  {
    name: "Sjællandsgade",
    revenue: "926K kr",
    change: "+8.7%",
    positive: true,
    margin: 71,
    orders: 1680,
    color: "hsl(var(--store-sjaellandsgade))",
  },
  {
    name: "Friis Shopping",
    revenue: "632K kr",
    change: "-3.2%",
    positive: false,
    margin: 65,
    orders: 980,
    color: "hsl(var(--store-friis))",
  },
];

const comparisonData = [
  { month: "Jan", Reberbansgade: 720, Sjællandsgade: 850, Friis: 590 },
  { month: "Feb", Reberbansgade: 780, Sjællandsgade: 890, Friis: 620 },
  { month: "Mar", Reberbansgade: 842, Sjællandsgade: 926, Friis: 632 },
];

export const StoreComparison = () => {
  return (
    <div className="space-y-6">
      {/* Store Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-scale-in">
        {stores.map((store, i) => (
          <Card key={i} className="glass-card hover-lift border-border/30">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-foreground">{store.name}</span>
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: store.color }}
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Omsætning</p>
                <p className="text-3xl font-bold text-foreground">{store.revenue}</p>
                <p
                  className={`text-sm flex items-center gap-1 mt-1 ${
                    store.positive ? "text-primary" : "text-accent"
                  }`}
                >
                  {store.positive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {store.change}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/30">
                <div>
                  <p className="text-xs text-muted-foreground">Dækningsgrad</p>
                  <p className="text-xl font-bold text-foreground">{store.margin}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Ordrer</p>
                  <p className="text-xl font-bold text-foreground">{store.orders}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Comparison Chart */}
      <Card className="glass-card border-border/30">
        <CardHeader>
          <CardTitle className="text-foreground">Omsætning Sammenligning (000 kr)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar
                dataKey="Reberbansgade"
                fill="hsl(var(--store-reberbansgade))"
                radius={[8, 8, 0, 0]}
                animationDuration={1000}
              />
              <Bar
                dataKey="Sjællandsgade"
                fill="hsl(var(--store-sjaellandsgade))"
                radius={[8, 8, 0, 0]}
                animationDuration={1000}
              />
              <Bar
                dataKey="Friis"
                fill="hsl(var(--store-friis))"
                radius={[8, 8, 0, 0]}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
