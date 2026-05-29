import { cn } from "@/lib/utils";
import type React from "react";

export function parseMarkdown(text: string): React.ReactNode[] {
  return text.split("\n").map((line, i) => {
    const isBullet =
      line.trim().startsWith("- ") || line.trim().startsWith("* ");
    const content = isBullet ? line.trim().substring(2) : line;

    const inlineParse = (txt: string): React.ReactNode[] => {
      const inlineRegex = /(\*\*.*?\*\*|`.*?`|\*.*?\*)/g;
      const subParts = txt.split(inlineRegex);

      return subParts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={index} className="font-bold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={index}
              className="bg-background/85 border border-border/60 px-1 py-0.5 rounded font-mono text-xs text-amber-500"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <em key={index} className="italic text-foreground/90">
              {part.slice(1, -1)}
            </em>
          );
        }
        return part;
      });
    };

    const parsedContent = inlineParse(content);

    if (isBullet) {
      return (
        <li
          key={i}
          className="ml-4 list-disc pl-1 mb-1 text-sm text-foreground"
        >
          {parsedContent}
        </li>
      );
    }

    return (
      <p
        key={i}
        className={cn(
          "text-sm mb-2 leading-relaxed text-foreground",
          line.trim() === "" && "h-2",
        )}
      >
        {parsedContent}
      </p>
    );
  });
}
