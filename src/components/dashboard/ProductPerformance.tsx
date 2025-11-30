import { TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const topProducts = [
  { name: "Kebab Classic", sales: 4200, margin: 68 },
  { name: "Durum Box", sales: 3800, margin: 72 },
  { name: "Falafel Bowl", sales: 2900, margin: 75 },
  { name: "Chili Cheese", sales: 2400, margin: 65 },
  { name: "Berlin Special", sales: 2100, margin: 70 },
];

const worstProducts = [
  { name: "Premium Salat", sales: 120, margin: 45 },
  { name: "Wrap Mini", sales: 180, margin: 52 },
  { name: "Veggie Platte", sales: 220, margin: 48 },
];

const productMix = [
  { category: "Kebab", Online: 420, Butik: 380, Wolt: 210 },
  { category: "Durum", Online: 380, Butik: 340, Wolt: 180 },
  { category: "Bowl", Online: 290, Butik: 260, Wolt: 150 },
  { category: "Tilbehør", Online: 240, Butik: 280, Wolt: 120 },
];

export const ProductPerformance = () => {
  return (
    <div className="space-y-6">
      {/* Top Products */}
      <Card className="glass-card border-border/30 animate-scale-in">
        <CardHeader>
          <CardTitle className="text-foreground">Top 5 Mest Solgte</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={topProducts} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
              <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" width={120} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="sales" radius={[0, 8, 8, 0]} animationDuration={1000}>
                {topProducts.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`hsl(var(--primary))`}
                    opacity={1 - index * 0.15}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Worst Performers */}
        <Card className="glass-card border-border/30 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-accent" />
              Laveste Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {worstProducts.map((product, i) => (
              <div key={i} className="p-3 rounded-lg glass">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">{product.name}</span>
                  <span className="text-sm text-accent">{product.sales} solgt</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-1000"
                      style={{ width: `${product.margin}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{product.margin}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Product Mix */}
        <Card className="glass-card border-border/30 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-foreground">Produkt Mix per Kanal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={productMix}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="Online" stackId="a" fill="hsl(var(--channel-online))" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Butik" stackId="a" fill="hsl(var(--channel-butik))" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Wolt" stackId="a" fill="hsl(var(--channel-wolt))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
