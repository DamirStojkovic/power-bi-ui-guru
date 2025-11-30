import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

const channelData = [
  { name: "Online", value: 42, color: "hsl(var(--channel-online))" },
  { name: "Butik", value: 38, color: "hsl(var(--channel-butik))" },
  { name: "Wolt", value: 20, color: "hsl(var(--channel-wolt))" },
];

const channelStats = [
  { channel: "Online", revenue: "1.0M kr", profit: "680K kr", avgOrder: "165 kr" },
  { channel: "Butik", revenue: "912K kr", profit: "620K kr", avgOrder: "138 kr" },
  { channel: "Wolt", revenue: "488K kr", profit: "310K kr", avgOrder: "148 kr" },
];

const growthData = [
  { month: "Jan", Online: 38, Butik: 42, Wolt: 18 },
  { month: "Feb", Online: 40, Butik: 40, Wolt: 19 },
  { month: "Mar", Online: 42, Butik: 38, Wolt: 20 },
];

export const ChannelAnalysis = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut Chart */}
        <Card className="glass-card border-border/30 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-foreground">Salgsfordeling</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={1000}
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4">
              {channelData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                  <span className="text-sm font-bold text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Channel Stats */}
        <Card className="glass-card border-border/30 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-foreground">Kanal Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {channelStats.map((stat, i) => (
              <div
                key={i}
                className="p-4 rounded-lg glass hover-lift transition-all duration-300"
              >
                <h4 className="font-semibold text-foreground mb-3">{stat.channel}</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Omsætning</p>
                    <p className="text-sm font-bold text-foreground">{stat.revenue}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Profit</p>
                    <p className="text-sm font-bold text-primary">{stat.profit}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Ø Ordre</p>
                    <p className="text-sm font-bold text-foreground">{stat.avgOrder}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Growth Chart */}
      <Card className="glass-card border-border/30">
        <CardHeader>
          <CardTitle className="text-foreground">Kanal Vækst (%)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthData}>
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
              <Line
                type="monotone"
                dataKey="Online"
                stroke="hsl(var(--channel-online))"
                strokeWidth={3}
                dot={{ r: 6 }}
                animationDuration={1000}
              />
              <Line
                type="monotone"
                dataKey="Butik"
                stroke="hsl(var(--channel-butik))"
                strokeWidth={3}
                dot={{ r: 6 }}
                animationDuration={1000}
              />
              <Line
                type="monotone"
                dataKey="Wolt"
                stroke="hsl(var(--channel-wolt))"
                strokeWidth={3}
                dot={{ r: 6 }}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
