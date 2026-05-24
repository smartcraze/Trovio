"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrandLogo } from "@/components/brand-logo";
import { ArrowRight, Loader2, Lock, User } from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await loginAction(null, formData);
      if (result.success) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(result.error || "Invalid username or password");
      }
    });
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-[20%] left-[20%] w-[350px] h-[350px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[350px] h-[350px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <Card className="w-full max-w-md border-border bg-card/60 backdrop-blur-2xl p-4 shadow-2xl relative z-10 rounded-[28px]">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <BrandLogo variant="white" width={130} height={38} />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
            Welcome back
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm mt-1">
            Log in to manage your digital presence
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label
                className="text-sm font-medium text-foreground"
                htmlFor="username"
              >
                Username
              </Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-muted-foreground">
                  <User size={16} />
                </span>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  placeholder="username"
                  className="pl-10 h-12 rounded-[20px] bg-background/50 border-border focus-visible:ring-primary focus-visible:border-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                className="text-sm font-medium text-foreground"
                htmlFor="password"
              >
                Password
              </Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-muted-foreground">
                  <Lock size={16} />
                </span>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="pl-10 h-12 rounded-[20px] bg-background/50 border-border focus-visible:ring-primary focus-visible:border-primary"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 rounded-full bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition shadow-lg shadow-primary/10 disabled:opacity-50 disabled:pointer-events-none mt-2"
            >
              {isPending ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  Continue <ArrowRight size={16} />
                </>
              )}
            </Button>
          </form>

          <div className="text-center mt-6 text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-primary hover:underline font-medium"
            >
              Create one
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
