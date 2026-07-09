import Link from "next/link";
import type { ContentMeta } from "@/lib/content";
import { contentHref } from "@/lib/content";

export default function PostCard({ post }: { post: ContentMeta }) {
  return (
    <Link
      href={contentHref(post.collection, post.slug)}
      className="group block border-t border-line pt-5 transition-colors hover:border-line-dark"
    >
      <div className="flex items-center gap-3 text-xs text-ink-muted">
        <time>{post.date}</time>
        {post.tags[0] && <span className="text-accent">{post.tags[0]}</span>}
      </div>
      <h3 className="mt-2 font-display text-xl font-bold text-ink group-hover:text-primary">{post.title}</h3>
      <p className="mt-1 text-sm text-ink-sub">{post.description}</p>
    </Link>
  );
}
