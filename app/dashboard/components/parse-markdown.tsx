"use client";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

interface ParseMarkdownProps {
  content: string;
}

export function ParseMarkdown({ content }: ParseMarkdownProps) {
  return (
    <div
      className="
        prose prose-sm dark:prose-invert max-w-none
        prose-p:leading-relaxed
        prose-p:mb-2
        prose-ul:my-2
        prose-li:my-1
        prose-strong:text-foreground
        prose-code:text-amber-500
        prose-code:bg-background/80
        prose-code:px-1
        prose-code:py-0.5
        prose-code:rounded
        prose-code:border
        prose-code:border-border/60
        prose-pre:bg-black/40
        prose-pre:border
        prose-pre:border-white/10
        prose-pre:rounded-xl
      "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
