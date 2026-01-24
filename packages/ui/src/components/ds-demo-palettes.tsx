import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function TailwindColorPalettes() {
  // Helper to generate color scale from 50-950
  const generateColorScale = (colorName: string) => {
    const scales = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    return scales.map(scale => ({
      scale,
      var: `--${colorName}-${scale}`,
      style: { backgroundColor: `var(--${colorName}-${scale})` }
    }));
  };

  // Neutral/Gray color families
  const neutralColors = {
    slate: generateColorScale('slate'),
    gray: generateColorScale('gray'),
    zinc: generateColorScale('zinc'),
    neutral: generateColorScale('neutral'),
    stone: generateColorScale('stone'),
  };

  // Color families
  const colorFamilies = {
    red: generateColorScale('red'),
    orange: generateColorScale('orange'),
    amber: generateColorScale('amber'),
    yellow: generateColorScale('yellow'),
    green: generateColorScale('green'),
    emerald: generateColorScale('emerald'),
    teal: generateColorScale('teal'),
    cyan: generateColorScale('cyan'),
    sky: generateColorScale('sky'),
    blue: generateColorScale('blue'),
    indigo: generateColorScale('indigo'),
    violet: generateColorScale('violet'),
    purple: generateColorScale('purple'),
    fuchsia: generateColorScale('fuchsia'),
    pink: generateColorScale('pink'),
    rose: generateColorScale('rose'),
  };

  const ColorScaleRow = ({ name, colors }: { name: string; colors: Array<{ scale: number; var: string; style: any }> }) => (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium capitalize w-20">{name}</span>
        <div className="flex-1 grid grid-cols-11 gap-1">
          {colors.map((color) => (
            <div
              key={color.scale}
              className="group relative"
            >
              <div
                className="h-10 rounded border cursor-pointer transition-transform hover:scale-110 hover:z-10"
                style={color.style}
                title={`${name}-${color.scale}`}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <span className="text-xs font-mono bg-black/75 text-white px-1 rounded">
                  {color.scale}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-2xl mb-2">Tailwind Color Palettes</h3>
        <p className="text-muted-foreground">Complete default Tailwind CSS color system from 50-950</p>
      </div>

      <Tabs defaultValue="neutrals" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="neutrals">Neutrals & Grays</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
        </TabsList>

        {/* Neutrals Tab */}
        <TabsContent value="neutrals" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Neutral Color Scales</CardTitle>
              <CardDescription>
                Five neutral color palettes optimized for different use cases. Each scale ranges from 50 (lightest) to 950 (darkest).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(neutralColors).map(([name, colors]) => (
                <ColorScaleRow key={name} name={name} colors={colors} />
              ))}
              
              <div className="mt-6 p-4 bg-muted rounded-lg space-y-2">
                <h4 className="text-sm font-semibold">Usage Guide</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li><strong>Slate:</strong> Cool gray with subtle blue undertones</li>
                  <li><strong>Gray:</strong> True gray, perfectly neutral</li>
                  <li><strong>Zinc:</strong> Modern gray with slight cool tone</li>
                  <li><strong>Neutral:</strong> Warm gray with balanced warmth</li>
                  <li><strong>Stone:</strong> Warm gray with earthy undertones</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Colors Tab */}
        <TabsContent value="colors" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Full Color Spectrum</CardTitle>
              <CardDescription>
                Complete Tailwind color palette with all hues. Perfect for UI elements, data visualization, and brand colors.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(colorFamilies).map(([name, colors]) => (
                <ColorScaleRow key={name} name={name} colors={colors} />
              ))}
              
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <h4 className="text-sm font-semibold">Color Temperature</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li><strong>Warm:</strong> Red, Orange, Amber, Yellow</li>
                    <li><strong>Cool:</strong> Sky, Blue, Indigo, Violet</li>
                    <li><strong>Balanced:</strong> Green, Teal, Cyan, Purple</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <h4 className="text-sm font-semibold">Common Uses</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li><strong>Success:</strong> Green, Emerald</li>
                    <li><strong>Warning:</strong> Amber, Yellow, Orange</li>
                    <li><strong>Error:</strong> Red, Rose</li>
                    <li><strong>Info:</strong> Blue, Sky, Cyan</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Reference Card */}
      <Card>
        <CardHeader>
          <CardTitle>Scale Reference</CardTitle>
          <CardDescription>Understanding the color scale system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="font-mono text-sm font-semibold">50-200</div>
              <p className="text-sm text-muted-foreground">
                Very light tints for backgrounds and subtle accents
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-mono text-sm font-semibold">300-400</div>
              <p className="text-sm text-muted-foreground">
                Light colors for borders, disabled states, and secondary elements
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-mono text-sm font-semibold">500-600</div>
              <p className="text-sm text-muted-foreground">
                Base colors for primary UI elements, buttons, and links
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-mono text-sm font-semibold">700-950</div>
              <p className="text-sm text-muted-foreground">
                Dark shades for text, headings, and high-contrast elements
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
