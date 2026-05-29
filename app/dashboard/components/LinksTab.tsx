"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart3,
  Edit2,
  ExternalLink,
  Plus,
  Smartphone,
  Trash2,
} from "lucide-react";
import type { LinkItem } from "./types";

interface LinksTabProps {
  links: LinkItem[];
  onAddLink: () => void;
  onEditLink: (link: LinkItem) => void;
  onDeleteLink: (id: string, title: string) => void;
}

export function LinksTab({
  links,
  onAddLink,
  onEditLink,
  onDeleteLink,
}: LinksTabProps) {
  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Manage Links</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Configure your handpicked custom URLs
          </p>
        </div>
        <Button
          onClick={onAddLink}
          className="rounded-full bg-primary hover:bg-primary/95 text-primary-foreground flex items-center gap-1 px-4 py-2 font-medium text-xs shadow-md shadow-primary/10"
        >
          <Plus size={16} /> Add Link
        </Button>
      </div>

      {/* Links list */}
      <div className="space-y-4">
        {links.length === 0 ? (
          <Card className="border-dashed border-border bg-card/40 rounded-xl text-center p-12 opacity-80">
            <CardContent className="p-0">
              <p className="text-sm mb-4 text-muted-foreground">
                No links added yet. Start by creating one!
              </p>
              <Button
                onClick={onAddLink}
                className="mx-auto rounded-full border border-border bg-background hover:bg-muted px-4 py-1 text-xs"
              >
                Create first link
              </Button>
            </CardContent>
          </Card>
        ) : (
          links.map((link) => (
            <Card
              key={link.id}
              className="bg-card/40 border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-md hover:bg-card/70 transition-colors"
            >
              {/* Link info */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground text-base">
                    {link.title}
                  </span>
                  {link.isDeepLink && (
                    <span className="flex items-center gap-0.5 text-[10px] px-2 py-0.5 rounded-full bg-secondary/15 border border-secondary/35 text-secondary font-medium">
                      <Smartphone size={10} /> DeepLink Enabled
                    </span>
                  )}
                </div>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-foreground break-all flex items-center gap-1"
                >
                  {link.url} <ExternalLink size={12} />
                </a>
              </div>

              {/* Actions row */}
              <div className="flex items-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-border justify-between sm:justify-start">
                <div className="text-xs text-muted-foreground flex items-center gap-1.5 bg-muted border border-border px-3 py-1.5 rounded-full">
                  <BarChart3 size={14} />{" "}
                  <span className="font-bold text-foreground">
                    {link.clickCount || 0}
                  </span>{" "}
                  clicks
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => onEditLink(link)}
                    variant="outline"
                    size="icon"
                    className="size-8 rounded-full border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                    title="Edit"
                  >
                    <Edit2 size={14} />
                  </Button>
                  <Button
                    onClick={() => onDeleteLink(link.id, link.title)}
                    variant="destructive"
                    size="icon"
                    className="size-8 rounded-full"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
