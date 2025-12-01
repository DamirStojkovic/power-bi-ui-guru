import { useState } from "react";
import { Building2, TrendingUp, ShoppingCart, Package, Users, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { DateRangeFilter } from "@/components/DateRangeFilter";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: (props: { activePage: string }) => React.ReactNode;
}

const navItems = [
  { id: "overview", label: "Executive Overview", icon: BarChart3 },
  { id: "stores", label: "Butiks-sammenligning", icon: Building2 },
  { id: "channels", label: "Salgskanal Analyse", icon: ShoppingCart },
  { id: "products", label: "Produkt Performance", icon: Package },
  { id: "operations", label: "Operationel Indsigt", icon: TrendingUp },
  { id: "employees", label: "Medarbejder Analyse", icon: Users },
];

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [activePage, setActivePage] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass border-b border-border/30 sticky top-0 z-50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">BD</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Berlin Döner</h1>
                <p className="text-xs text-muted-foreground">Aalborg Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DateRangeFilter />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="glass border-b border-border/30 backdrop-blur-xl">
        <div className="container mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all duration-300",
                    "hover-lift",
                    isActive
                      ? "glass bg-primary/10 text-primary border border-primary/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 animate-fade-in">
        {children({ activePage })}
      </main>
    </div>
  );
};
