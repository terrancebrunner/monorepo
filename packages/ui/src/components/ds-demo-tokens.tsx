import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function DesignTokens() {
  const colorTokens = [
    { name: "Background", var: "--background", class: "bg-background" },
    { name: "Foreground", var: "--foreground", class: "bg-foreground" },
    { name: "Primary", var: "--primary", class: "bg-primary" },
    { name: "Primary Foreground", var: "--primary-foreground", class: "bg-primary-foreground" },
    { name: "Secondary", var: "--secondary", class: "bg-secondary" },
    { name: "Secondary Foreground", var: "--secondary-foreground", class: "bg-secondary-foreground" },
    { name: "Muted", var: "--muted", class: "bg-muted" },
    { name: "Muted Foreground", var: "--muted-foreground", class: "bg-muted-foreground" },
    { name: "Accent", var: "--accent", class: "bg-accent" },
    { name: "Accent Foreground", var: "--accent-foreground", class: "bg-accent-foreground" },
    { name: "Destructive", var: "--destructive", class: "bg-destructive" },
    { name: "Destructive Foreground", var: "--destructive-foreground", class: "bg-destructive-foreground" },
  ];

  const utilityColors = [
    { name: "Success", var: "--success", class: "bg-[var(--success)]" },
    { name: "Warning", var: "--warning", class: "bg-[var(--warning)]" },
    { name: "Info", var: "--info", class: "bg-[var(--info)]" },
  ];

  const chartColors = [
    { name: "Chart 1", var: "--chart-1", class: "bg-chart-1" },
    { name: "Chart 2", var: "--chart-2", class: "bg-chart-2" },
    { name: "Chart 3", var: "--chart-3", class: "bg-chart-3" },
    { name: "Chart 4", var: "--chart-4", class: "bg-chart-4" },
    { name: "Chart 5", var: "--chart-5", class: "bg-chart-5" },
  ];

  const typographyScale = [
    { name: "xs", size: "0.75rem", var: "--text-xs", class: "text-xs" },
    { name: "sm", size: "0.875rem", var: "--text-sm", class: "text-sm" },
    { name: "base", size: "1rem", var: "--text-base", class: "text-base" },
    { name: "lg", size: "1.125rem", var: "--text-lg", class: "text-lg" },
    { name: "xl", size: "1.25rem", var: "--text-xl", class: "text-xl" },
    { name: "2xl", size: "1.5rem", var: "--text-2xl", class: "text-2xl" },
    { name: "3xl", size: "1.875rem", var: "--text-3xl", class: "text-3xl" },
    { name: "4xl", size: "2.25rem", var: "--text-4xl", class: "text-4xl" },
    { name: "5xl", size: "3rem", var: "--text-5xl", class: "text-5xl" },
    { name: "6xl", size: "3.75rem", var: "--text-6xl", class: "text-6xl" },
  ];

  const fontWeights = [
    { name: "Light", weight: "300", var: "--font-weight-light", class: "font-light" },
    { name: "Normal", weight: "400", var: "--font-weight-normal", class: "font-normal" },
    { name: "Medium", weight: "500", var: "--font-weight-medium", class: "font-medium" },
    { name: "Semibold", weight: "600", var: "--font-weight-semibold", class: "font-semibold" },
    { name: "Bold", weight: "700", var: "--font-weight-bold", class: "font-bold" },
  ];

  const spacingScale = [
    { name: "0", value: "0", var: "--spacing-0" },
    { name: "1", value: "0.25rem", var: "--spacing-1" },
    { name: "2", value: "0.5rem", var: "--spacing-2" },
    { name: "3", value: "0.75rem", var: "--spacing-3" },
    { name: "4", value: "1rem", var: "--spacing-4" },
    { name: "5", value: "1.25rem", var: "--spacing-5" },
    { name: "6", value: "1.5rem", var: "--spacing-6" },
    { name: "8", value: "2rem", var: "--spacing-8" },
    { name: "10", value: "2.5rem", var: "--spacing-10" },
    { name: "12", value: "3rem", var: "--spacing-12" },
    { name: "16", value: "4rem", var: "--spacing-16" },
    { name: "20", value: "5rem", var: "--spacing-20" },
    { name: "24", value: "6rem", var: "--spacing-24" },
  ];

  const radiusScale = [
    { name: "xs", value: "0.25rem", var: "--radius-xs" },
    { name: "sm", value: "0.375rem", var: "--radius-sm" },
    { name: "md", value: "0.5rem", var: "--radius-md" },
    { name: "lg", value: "0.625rem", var: "--radius-lg" },
    { name: "xl", value: "0.75rem", var: "--radius-xl" },
    { name: "2xl", value: "1rem", var: "--radius-2xl" },
    { name: "3xl", value: "1.5rem", var: "--radius-3xl" },
    { name: "full", value: "9999px", var: "--radius-full" },
  ];

  return (
    <section id="tokens" className="space-y-6">
      <div>
        <h3 className="text-2xl mb-2">Design Tokens</h3>
        <p className="text-muted-foreground">Complete color palette, typography, and spacing system</p>
      </div>

      {/* Color System */}
      <Card>
        <CardHeader>
          <CardTitle>Color System</CardTitle>
          <CardDescription>Semantic color tokens for consistent theming</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold mb-3">Base & Semantic Colors</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {colorTokens.map((token) => (
                <div key={token.var} className="space-y-2">
                  <div className={`h-16 rounded-lg border ${token.class}`}></div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">{token.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{token.var}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-semibold mb-3">Utility Colors</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {utilityColors.map((token) => (
                <div key={token.var} className="space-y-2">
                  <div className={`h-16 rounded-lg border ${token.class}`}></div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">{token.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{token.var}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-semibold mb-3">Chart Colors</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {chartColors.map((token) => (
                <div key={token.var} className="space-y-2">
                  <div className={`h-16 rounded-lg border ${token.class}`}></div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">{token.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{token.var}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Typography */}
      <Card>
        <CardHeader>
          <CardTitle>Typography</CardTitle>
          <CardDescription>Font sizes, weights, and spacing for text hierarchy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold mb-3">Type Scale</h4>
            <div className="space-y-3">
              {typographyScale.map((type) => (
                <div 
                  key={type.var} 
                  className="flex items-baseline justify-between py-2 border-b last:border-b-0"
                >
                  <div className="flex items-baseline gap-4">
                    <Badge variant="outline" className="font-mono text-xs w-16 justify-center">
                      {type.name}
                    </Badge>
                    <span className={type.class}>The quick brown fox jumps over the lazy dog</span>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono ml-4">{type.size}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-semibold mb-3">Font Weights</h4>
            <div className="space-y-2">
              {fontWeights.map((weight) => (
                <div 
                  key={weight.var} 
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="font-mono text-xs w-24 justify-center">
                      {weight.name}
                    </Badge>
                    <span className={`text-lg ${weight.class}`}>
                      The quick brown fox jumps over the lazy dog
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">{weight.weight}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spacing & Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Spacing Scale</CardTitle>
            <CardDescription>Consistent spacing tokens for layout</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {spacingScale.map((space) => (
                <div key={space.var} className="flex items-center gap-4">
                  <Badge variant="outline" className="font-mono text-xs w-12 justify-center shrink-0">
                    {space.name}
                  </Badge>
                  <div 
                    className="h-8 bg-primary rounded"
                    style={{ width: space.value }}
                  ></div>
                  <span className="text-xs text-muted-foreground font-mono ml-auto">
                    {space.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Border Radius</CardTitle>
            <CardDescription>Rounded corner variations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {radiusScale.map((radius) => (
                <div key={radius.var} className="flex items-center gap-4">
                  <Badge variant="outline" className="font-mono text-xs w-12 justify-center shrink-0">
                    {radius.name}
                  </Badge>
                  <div 
                    className="h-16 w-16 bg-primary border-2 border-primary-foreground shrink-0"
                    style={{ borderRadius: radius.value }}
                  ></div>
                  <span className="text-xs text-muted-foreground font-mono ml-auto">
                    {radius.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shadows */}
      <Card>
        <CardHeader>
          <CardTitle>Elevation & Shadows</CardTitle>
          <CardDescription>Shadow tokens for depth and hierarchy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {['xs', 'sm', 'md', 'lg', 'xl', '2xl'].map((size) => (
              <div key={size} className="space-y-3">
                <div 
                  className="h-24 bg-card rounded-lg border flex items-center justify-center"
                  style={{ boxShadow: `var(--shadow-${size})` }}
                >
                  <span className="text-sm font-medium">{size}</span>
                </div>
                <p className="text-xs text-muted-foreground font-mono text-center">
                  --shadow-{size}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}