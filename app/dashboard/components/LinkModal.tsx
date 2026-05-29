"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2, Save, Smartphone, Sparkles } from "lucide-react";
import type React from "react";
import type { LinkModalState } from "./types";

interface LinkModalProps {
  modal: LinkModalState;
  linkTitleVal: string;
  setLinkTitleVal: (v: string) => void;
  linkUrlVal: string;
  setLinkUrlVal: (v: string) => void;
  linkDeepLink: boolean;
  setLinkDeepLink: (v: boolean) => void;
  isPending: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  onImproveWithAi: () => void;
}

export function LinkModal({
  modal,
  linkTitleVal,
  setLinkTitleVal,
  linkUrlVal,
  setLinkUrlVal,
  linkDeepLink,
  setLinkDeepLink,
  isPending,
  onSubmit,
  onClose,
  onImproveWithAi,
}: LinkModalProps) {
  return (
    <Dialog open={modal.open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-lg bg-card border-border rounded-xl p-6 sm:p-8 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            {modal.mode === "add" ? "Create Custom Link" : "Edit Link Details"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs">
            Fill in the destination and customize the redirection options.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-5 mt-4">
          {/* URL */}
          <div className="space-y-2">
            <Label
              className="text-sm font-medium text-foreground block"
              htmlFor="link_url"
            >
              Destination URL
            </Label>
            <Input
              id="link_url"
              name="url"
              type="url"
              required
              placeholder="https://..."
              value={linkUrlVal}
              onChange={(e) => setLinkUrlVal(e.target.value)}
              className="h-11 rounded-lg bg-background/50 border-border"
            />
          </div>

          {/* Title + AI button */}
          <div className="space-y-2">
            <Label
              className="text-sm font-medium text-foreground block"
              htmlFor="link_title"
            >
              Link Title
            </Label>
            <div className="flex gap-2">
              <Input
                id="link_title"
                name="title"
                type="text"
                required
                placeholder="e.g. Follow me on Twitter"
                value={linkTitleVal}
                onChange={(e) => setLinkTitleVal(e.target.value)}
                className="h-11 rounded-lg bg-background/50 border-border flex-1"
              />
              <Button
                type="button"
                onClick={onImproveWithAi}
                variant="outline"
                className="h-11 rounded-lg border-primary/20 hover:border-primary/40 text-primary hover:text-primary/90 flex items-center gap-1.5 px-4 shrink-0 cursor-pointer text-xs"
              >
                <Sparkles size={14} />
                Improve with AI
              </Button>
            </div>
          </div>

          {/* Deep Link toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border">
            <div className="space-y-1 pr-4">
              <span className="text-sm font-medium text-foreground flex items-center gap-1.5">
                <Smartphone size={16} className="text-primary" /> Enable Deep
                Linking
              </span>
              <p className="text-xs text-muted-foreground">
                Auto-redirects mobile users to their native mobile application
                instead of browser page.
              </p>
            </div>
            <Switch checked={linkDeepLink} onCheckedChange={setLinkDeepLink} />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-full h-11"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="px-6 h-11 bg-primary hover:bg-primary/95 text-primary-foreground rounded-full font-medium transition disabled:opacity-50 flex items-center gap-1"
            >
              {isPending ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Save size={16} />
              )}
              Save Link
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
