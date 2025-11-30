import { useState } from "react";
import { User, TrendingUp, Clock, DollarSign, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const employees = [
  {
    id: 1,
    name: "Mohammad Ali",
    hours: 168,
    revenue: 142800,
    orders: 892,
    salary: 42000,
    upselling: { bags: 312, ketchup: 245, chiliMayo: 189, truffelMayo: 156, dessert: 78 },
  },
  {
    id: 2,
    name: "Sarah Nielsen",
    hours: 152,
    revenue: 128400,
    orders: 804,
    salary: 38000,
    upselling: { bags: 289, ketchup: 221, chiliMayo: 167, truffelMayo: 142, dessert: 65 },
  },
  {
    id: 3,
    name: "Ahmed Hassan",
    hours: 144,
    revenue: 118200,
    orders: 742,
    salary: 36000,
    upselling: { bags: 256, ketchup: 198, chiliMayo: 145, truffelMayo: 128, dessert: 58 },
  },
];

export const EmployeeAnalysis = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);

  const revenuePerHour = Math.round(selectedEmployee.revenue / selectedEmployee.hours);
  const upsellingRate = Math.round(
    ((selectedEmployee.upselling.bags / selectedEmployee.orders) * 100)
  );
  const revenueVsSalary = ((selectedEmployee.revenue / selectedEmployee.salary) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Employee List */}
        <Card className="glass-card border-border/30 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-foreground">Medarbejdere</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {employees.map((emp) => (
              <button
                key={emp.id}
                onClick={() => setSelectedEmployee(emp)}
                className={cn(
                  "w-full p-4 rounded-lg text-left transition-all duration-300",
                  "hover-lift",
                  selectedEmployee.id === emp.id
                    ? "glass bg-primary/10 border border-primary/30"
                    : "glass hover:bg-muted/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{emp.name}</p>
                    <p className="text-xs text-muted-foreground">{emp.hours} timer</p>
                  </div>
                  {selectedEmployee.id === emp.id && (
                    <Award className="w-5 h-5 text-primary" />
                  )}
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="glass-card border-border/30 hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Timer</p>
                </div>
                <p className="text-2xl font-bold text-foreground">{selectedEmployee.hours}</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-border/30 hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Omsætning/time</p>
                </div>
                <p className="text-2xl font-bold text-foreground">{revenuePerHour} kr</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-border/30 hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Løn</p>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {Math.round(selectedEmployee.salary / 1000)}K
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-border/30 hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Ratio</p>
                </div>
                <p className="text-2xl font-bold text-primary">{revenueVsSalary}%</p>
              </CardContent>
            </Card>
          </div>

          {/* Upselling Performance */}
          <Card className="glass-card border-border/30">
            <CardHeader>
              <CardTitle className="text-foreground">Upselling Performance</CardTitle>
              <p className="text-sm text-muted-foreground">
                {selectedEmployee.name} • Target: 30% pose-rate
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg glass">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">Poser</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-foreground">
                      {selectedEmployee.upselling.bags}
                    </span>
                    <span className="text-xs text-primary ml-2">({upsellingRate}%)</span>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full transition-all duration-1000",
                      upsellingRate >= 30 ? "bg-primary" : "bg-accent"
                    )}
                    style={{ width: `${Math.min(upsellingRate, 100)}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Ketchup", value: selectedEmployee.upselling.ketchup },
                  { label: "Chili Mayo", value: selectedEmployee.upselling.chiliMayo },
                  { label: "Trøffel Mayo", value: selectedEmployee.upselling.truffelMayo },
                  { label: "Desserter", value: selectedEmployee.upselling.dessert },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-lg glass">
                    <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                    <p className="text-xl font-bold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
