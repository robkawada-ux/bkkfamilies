import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Minimal inline markup for article body text and FAQ answers.
 *
 * Article bodies are plain strings rendered straight into a <p>, which was
 * fine for schools and local-life writing but not for healthcare, where a
 * claim that cannot cite its source inline is a weaker claim. This adds the
 * two pieces of markup that actually earn their place and nothing else:
 *
 *   [label](/healthcare/hospitals/medpark-hospital)   internal link
 *   [label](https://example.com/page)                 external link
 *   **emphasis**                                      bold
 *
 * Deliberately NOT a markdown parser. No headings (the headings array already
 * handles those), no lists, no tables, no images (the images array handles
 * those). If a paragraph wants a table, it wants to be a directory instead.
 *
 * A link nested inside bold works, because the bold branch recurses. Bold
 * nested inside a link label does not, and is not worth supporting.
 *
 * NOTE: this file has no "use client" and must not gain one. Server pages
 * import from here, and a client boundary would turn these exports into
 * client references that silently resolve to undefined.
 */

/** [label](target) or **bold**. Order matters: links before bold. */
const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

function isInternal(href: string): boolean {
  return href.startsWith("/");
}

export function renderRichText(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  for (const match of text.matchAll(TOKEN)) {
    const full = match[0] ?? "";
    const linkLabel = match[1];
    const href = match[2];
    const boldText = match[3];
    const start = match.index ?? 0;

    if (start > lastIndex) {
      nodes.push(text.slice(lastIndex, start));
    }

    if (linkLabel && href) {
      nodes.push(
        isInternal(href) ? (
          <Link
            key={key++}
            href={href}
            className="font-semibold text-teal underline decoration-teal/30 underline-offset-2 hover:decoration-teal"
          >
            {linkLabel}
          </Link>
        ) : (
          <a
            key={key++}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-teal underline decoration-teal/30 underline-offset-2 hover:decoration-teal"
          >
            {linkLabel}
          </a>
        )
      );
    } else if (boldText) {
      // Recurse so a link inside bold still renders as a link. The bold
      // pattern excludes asterisks, so the recursion only ever has links
      // left to find and cannot loop.
      nodes.push(
        <strong key={key++} className="font-bold text-neutral-900">
          {renderRichText(boldText)}
        </strong>
      );
    }

    lastIndex = start + full.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

/**
 * Same string with the markup removed. Structured data and meta descriptions
 * must never carry raw [label](url) syntax, so anything that feeds JSON-LD
 * goes through here first.
 */
export function stripRichText(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1");
}

export default function RichText({ text }: { text: string }) {
  return <>{renderRichText(text)}</>;
}
