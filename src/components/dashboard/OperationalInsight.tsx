import { Clock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ordersByHour = [
  { hour: "08:00", orders: 12 },
  { hour: "09:00", orders: 28 },
  { hour: "10:00", orders: 42 },
  { hour: "11:00", orders: 65 },
  { hour: "12:00", orders: 98 },
  { hour: "13:00", orders: 87 },
  { hour: "14:00", orders: 54 },
  { hour: "15:00", orders: 38 },
  { hour: "16:00", orders: 45 },
  { hour: "17:00", orders: 72 },
  { hour: "18:00", orders: 89 },
  { hour: "19:00", orders: 76 },
  { hour: "20:00", orders: 52 },
  { hour: "21:00", orders: 34 },
  { hour: "22:00", orders: 18 },
];

const peakHours = [
  { time: "12:00-13:00", intensity: 98, label: "Frokost Rush" },
  { time: "18:00-19:00", intensity: 89, label: "Aften Peak" },
  { time: "17:00-18:00", intensity: 72, label: "Efter arbejde" },
];

const productivity = [
  { metric: "Ordrer per medarbejder", value: 14.5, target: 12 },
  { metric: "Gennemsnitlig håndteringstid", value: "4.2 min", target: "5 min" },
  { metric: "Effektivitet", value: "92%", target: "85%" },
];

export const OperationalInsight = () => {
  return (
    <div className="space-y-6">
      {/* Orders by Hour */}
      <Card className="glass-card border-border/30 animate-scale-in">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Ordrer per Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={ordersByHour}>
              <defs>
                <linearGradient id="orderGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="orders"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                fill="url(#orderGradient)"
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Peak Hours */}
        <Card className="glass-card border-border/30 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-foreground">Peak Timer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {peakHours.map((peak, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-foreground">{peak.time}</p>
                    <p className="text-xs text-muted-foreground">{peak.label}</p>
                  </div>
                  <span className="text-sm font-bold text-primary">{peak.intensity} ordrer</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
                    style={{ width: `${peak.intensity}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Productivity */}
        <Card className="glass-card border-border/30 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Produktivitet
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {productivity.map((item, i) => (
              <div key={i} className="p-3 rounded-lg glass">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm text-muted-foreground">{item.metric}</p>
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">{item.value}</p>
                    <p className="text-xs text-muted-foreground">Target: {item.target}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
