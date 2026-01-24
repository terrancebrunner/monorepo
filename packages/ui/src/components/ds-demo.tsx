"use client"

import { useState } from "react";
import { Header } from "./blocks/header-01";
import { Footer } from "./blocks/footer-01";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from "./ui/card";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Tabs } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { 
  Bell, 
  Search, 
  Plus, 
  Trash2, 
  Edit, 
  Settings, 
  User, 
  Download,
  ChevronRight,
  Star,
  Heart,
  Share2,
  MoreVertical
} from "lucide-react";
import { DesignTokens } from "./ds-demo-tokens";
import { TailwindColorPalettes } from "./ds-demo-palettes";
import { LoginDemo } from "./blocks/login-01";

export function DesignSystem() {
  const [switchChecked, setSwitchChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [progress, setProgress] = useState(33);
  const [sliderValue, setSliderValue] = useState([50]);

  return (
    <div className="min-h-screen bg-background">
    {/* <Toaster /> */}

    {/* Header */}
      <Header />

    {/* Main Content */}
      <main className="container py-12 px-8">
        <div className="max-w-7xl mx-auto space-y-12">

          {/* Hero Section */}
          <header className="space-y-4">
            <Badge variant="secondary">Component Library</Badge>
            <h1 className="text-4xl tracking-tight">Modern UI Primitives</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              A comprehensive collection of accessible, customizable, and production-ready React components built with Radix UI and Tailwind CSS.
            </p>
          </header>

          <Separator />
          {/* Design Tokens Section */}
          <DesignTokens />
          <Separator />
          {/* Tailwind Color Palettes Section */}
          <TailwindColorPalettes />

        </div>
      </main>
      <LoginDemo />
    {/* Footer */}
      <Footer />

    </div>
  );
}