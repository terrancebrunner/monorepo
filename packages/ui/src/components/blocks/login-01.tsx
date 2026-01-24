"use state"

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
// import { ThemeToggle } from "../blocks/theme-toggle";
import { Lock, Mail, Eye, EyeOff, Github, Chrome } from "lucide-react";
import { useState } from "react";

export function LoginDemo() {
  return (
    <div className="w-full bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-8 relative overflow-hidden">

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">

        <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
            <h1 className="text-4xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your account to continue</p>
        </div>
      </div>

        {/* Main Login Card */}
         <Card>
            <CardHeader>
              <CardTitle>Login Form Example</CardTitle>
              <CardDescription>Combining Input, Label, and Button</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-w-sm">
                <div className="space-y-1.5">
                  <Label htmlFor="login-email">Email address</Label>
                  <Input id="login-email" type="email" placeholder="you@example.com" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="login-password">Password</Label>
                  <Input id="login-password" type="password" placeholder="Enter your password" />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1">Sign in</Button>
                  <Button variant="outline" className="flex-1">Cancel</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground">All primitives work seamlessly together</p>
            </CardFooter>
          </Card>

        {/* Footer */}
        <div className="text-center space-y-2 pt-4">
          <p className="text-xs text-muted-foreground">
            By signing in, you agree to our{" "}
            <button className="text-primary hover:underline">Terms of Service</button>
            {" "}and{" "}
            <button className="text-primary hover:underline">Privacy Policy</button>
          </p>
        </div>

      </div>
    </div>
  );
}
