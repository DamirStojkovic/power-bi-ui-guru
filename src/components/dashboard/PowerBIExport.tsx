import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileJson, FileSpreadsheet, FileText, Package } from "lucide-react";
import { toast } from "sonner";

export const PowerBIExport = () => {
  const handleDownload = (filePath: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`${fileName} downloaded`);
  };

  const downloadAll = () => {
    toast.info("Downloading all files...");
    
    // Download theme
    handleDownload('/berlin-doner-powerbi-theme.json', 'berlin-doner-powerbi-theme.json');
    
    // Download data templates
    setTimeout(() => handleDownload('/data-templates/stores-data.csv', 'stores-data.csv'), 500);
    setTimeout(() => handleDownload('/data-templates/sales-channels.csv', 'sales-channels.csv'), 1000);
    setTimeout(() => handleDownload('/data-templates/products.csv', 'products.csv'), 1500);
    setTimeout(() => handleDownload('/data-templates/employees.csv', 'employees.csv'), 2000);
    
    // Download guides
    setTimeout(() => handleDownload('/power-bi-guide/dax-formulas.md', 'dax-formulas.md'), 2500);
    setTimeout(() => handleDownload('/power-bi-guide/setup-guide.md', 'setup-guide.md'), 3000);
    
    toast.success("All files downloaded!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Power BI Export Pakke</h2>
          <p className="text-muted-foreground mt-2">
            Download alt du skal bruge for at bygge dashboardet i Power BI Desktop
          </p>
        </div>
        <Button onClick={downloadAll} size="lg" className="gap-2">
          <Package className="h-5 w-5" />
          Download Alt
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Theme File */}
        <Card className="glass-card hover-lift">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gold/10">
                <FileJson className="h-6 w-6 text-gold" />
              </div>
              <div>
                <CardTitle>Power BI Theme</CardTitle>
                <CardDescription>berlin-doner-powerbi-theme.json</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Theme fil med brandfarver, Nunito Sans font og styling til visualiseringer.
              Importer denne i Power BI Desktop under View → Themes.
            </p>
            <Button 
              onClick={() => handleDownload('/berlin-doner-powerbi-theme.json', 'berlin-doner-powerbi-theme.json')}
              variant="secondary"
              className="w-full gap-2"
            >
              <Download className="h-4 w-4" />
              Download Theme
            </Button>
          </CardContent>
        </Card>

        {/* Setup Guide */}
        <Card className="glass-card hover-lift">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gold/10">
                <FileText className="h-6 w-6 text-gold" />
              </div>
              <div>
                <CardTitle>Setup Guide</CardTitle>
                <CardDescription>setup-guide.md</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Komplet step-by-step guide til at bygge alle 6 dashboard sider i Power BI.
              Inkluderer visualisering anbefalinger og styling tips.
            </p>
            <Button 
              onClick={() => handleDownload('/power-bi-guide/setup-guide.md', 'setup-guide.md')}
              variant="secondary"
              className="w-full gap-2"
            >
              <Download className="h-4 w-4" />
              Download Guide
            </Button>
          </CardContent>
        </Card>

        {/* DAX Formulas */}
        <Card className="glass-card hover-lift">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gold/10">
                <FileText className="h-6 w-6 text-gold" />
              </div>
              <div>
                <CardTitle>DAX Formler</CardTitle>
                <CardDescription>dax-formulas.md</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Alle DAX measures til dækningsgrad, YoY sammenligninger, upselling rate,
              og andre nøgle beregninger. Klar til copy-paste.
            </p>
            <Button 
              onClick={() => handleDownload('/power-bi-guide/dax-formulas.md', 'dax-formulas.md')}
              variant="secondary"
              className="w-full gap-2"
            >
              <Download className="h-4 w-4" />
              Download DAX Formler
            </Button>
          </CardContent>
        </Card>

        {/* Data Templates */}
        <Card className="glass-card hover-lift">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gold/10">
                <FileSpreadsheet className="h-6 w-6 text-gold" />
              </div>
              <div>
                <CardTitle>Data Skabeloner</CardTitle>
                <CardDescription>4 CSV filer</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Eksempel data struktur for butikker, kanaler, produkter og medarbejdere.
              Brug som reference når du forbinder dine egne data.
            </p>
            <div className="space-y-2">
              <Button 
                onClick={() => handleDownload('/data-templates/stores-data.csv', 'stores-data.csv')}
                variant="outline"
                size="sm"
                className="w-full gap-2"
              >
                <Download className="h-3 w-3" />
                stores-data.csv
              </Button>
              <Button 
                onClick={() => handleDownload('/data-templates/sales-channels.csv', 'sales-channels.csv')}
                variant="outline"
                size="sm"
                className="w-full gap-2"
              >
                <Download className="h-3 w-3" />
                sales-channels.csv
              </Button>
              <Button 
                onClick={() => handleDownload('/data-templates/products.csv', 'products.csv')}
                variant="outline"
                size="sm"
                className="w-full gap-2"
              >
                <Download className="h-3 w-3" />
                products.csv
              </Button>
              <Button 
                onClick={() => handleDownload('/data-templates/employees.csv', 'employees.csv')}
                variant="outline"
                size="sm"
                className="w-full gap-2"
              >
                <Download className="h-3 w-3" />
                employees.csv
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Sådan Kommer Du I Gang</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="font-bold text-gold min-w-6">1.</span>
              <span>Download <strong>berlin-doner-powerbi-theme.json</strong> og importer den i Power BI Desktop (View → Themes → Browse for themes)</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-gold min-w-6">2.</span>
              <span>Åbn <strong>setup-guide.md</strong> og følg step-by-step instruktionerne for at bygge hver dashboard side</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-gold min-w-6">3.</span>
              <span>Brug <strong>CSV skabelonerne</strong> som reference til at strukturere dine egne data korrekt</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-gold min-w-6">4.</span>
              <span>Kopier <strong>DAX formler</strong> fra dax-formulas.md til at oprette alle measures og beregninger</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-gold min-w-6">5.</span>
              <span>Test dashboardet med dine data og juster efter behov</span>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};
