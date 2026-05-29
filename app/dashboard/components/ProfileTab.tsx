"use client";

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
import { Loader2, Sparkles } from "lucide-react";
import type React from "react";
import type { DashboardUser } from "./types";

interface ProfileTabProps {
  user: DashboardUser;
  isPending: boolean;
  profileNameVal: string;
  setProfileNameVal: (v: string) => void;
  profileBioVal: string;
  setProfileBioVal: (v: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onImproveBioWithAi: () => void;
}

const SOCIAL_PLATFORMS = [
  { id: "instagram", label: "Instagram" },
  { id: "twitter", label: "Twitter / X" },
  { id: "youtube", label: "YouTube" },
  { id: "spotify", label: "Spotify" },
  { id: "github", label: "GitHub" },
  { id: "tiktok", label: "TikTok" },
  { id: "website", label: "Website" },
] as const;

export function ProfileTab({
  user,
  isPending,
  profileNameVal,
  setProfileNameVal,
  profileBioVal,
  setProfileBioVal,
  onSubmit,
  onImproveBioWithAi,
}: ProfileTabProps) {
  return (
    <Card className="border-border bg-card/60 backdrop-blur-2xl p-6 sm:p-8 rounded-xl shadow-xl">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-xl font-bold text-foreground">
          Profile Settings
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          Customize your creator details and social channels.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Name + Avatar row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                className="text-sm text-foreground font-medium"
                htmlFor="profile_name"
              >
                Display Name
              </Label>
              <Input
                id="profile_name"
                name="name"
                type="text"
                required
                value={profileNameVal}
                onChange={(e) => setProfileNameVal(e.target.value)}
                className="h-11 rounded-lg bg-background/50 border-border"
              />
            </div>

            <div className="space-y-2">
              <Label
                className="text-sm text-foreground font-medium"
                htmlFor="profile_avatar"
              >
                Avatar Image URL
              </Label>
              <Input
                id="profile_avatar"
                name="avatarUrl"
                type="url"
                placeholder="https://images.unsplash.com/..."
                defaultValue={user.avatarUrl}
                className="h-11 rounded-lg bg-background/50 border-border"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label
              className="text-sm text-foreground font-medium"
              htmlFor="profile_bio"
            >
              Bio (Max 160 characters)
            </Label>
            <textarea
              id="profile_bio"
              name="bio"
              maxLength={160}
              value={profileBioVal}
              onChange={(e) => setProfileBioVal(e.target.value)}
              rows={3}
              placeholder="Tell your story..."
              className="w-full bg-background/50 border border-border rounded-lg p-4 text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition resize-none"
            />
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={onImproveBioWithAi}
                variant="outline"
                size="sm"
                className="border-primary/20 hover:border-primary/40 text-primary hover:text-primary/90 flex items-center gap-1.5 px-3 py-1.5 rounded-lg cursor-pointer text-xs"
              >
                <Sparkles size={12} />
                Improve with AI
              </Button>
            </div>
          </div>

          {/* Social Channels */}
          <div className="border-t border-border pt-6 space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Social Channels
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SOCIAL_PLATFORMS.map((platform) => (
                <div key={platform.id} className="space-y-1">
                  <Label
                    className="text-xs text-muted-foreground capitalize"
                    htmlFor={`social_${platform.id}`}
                  >
                    {platform.label} Link
                  </Label>
                  <Input
                    id={`social_${platform.id}`}
                    name={`social_${platform.id}`}
                    type="url"
                    placeholder={`https://${platform.id}.com/...`}
                    defaultValue={user.socials?.[platform.id] || ""}
                    className="h-10 rounded-lg bg-background/50 border-border text-xs"
                  />
                </div>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="px-6 h-11 bg-primary hover:bg-primary/95 text-primary-foreground rounded-full font-medium transition shadow-md shadow-primary/10 disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
