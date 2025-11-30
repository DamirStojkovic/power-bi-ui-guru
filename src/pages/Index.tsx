import { DashboardLayout } from "@/components/DashboardLayout";
import { ExecutiveOverview } from "@/components/dashboard/ExecutiveOverview";
import { StoreComparison } from "@/components/dashboard/StoreComparison";
import { ChannelAnalysis } from "@/components/dashboard/ChannelAnalysis";
import { ProductPerformance } from "@/components/dashboard/ProductPerformance";
import { OperationalInsight } from "@/components/dashboard/OperationalInsight";
import { EmployeeAnalysis } from "@/components/dashboard/EmployeeAnalysis";

const Index = () => {
  return (
    <DashboardLayout>
      {({ activePage }: { activePage: string }) => (
        <>
          {activePage === "overview" && <ExecutiveOverview />}
          {activePage === "stores" && <StoreComparison />}
          {activePage === "channels" && <ChannelAnalysis />}
          {activePage === "products" && <ProductPerformance />}
          {activePage === "operations" && <OperationalInsight />}
          {activePage === "employees" && <EmployeeAnalysis />}
        </>
      )}
    </DashboardLayout>
  );
};

export default Index;
