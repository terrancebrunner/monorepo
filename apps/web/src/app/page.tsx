import { Button, Card, CardHeader, CardTitle, CardContent } from "@repo/ui";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-surface p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Web App</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-text-muted">Using shared UI components.</p>
          <div className="flex gap-2">
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}