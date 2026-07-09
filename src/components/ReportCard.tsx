import Link from "next/link";
import type { ContentMeta } from "@/lib/content";
import { contentHref } from "@/lib/content";

export default function ReportCard({ report }: { report: ContentMeta }) {
  return (
    <Link
      href={contentHref(report.collection, report.slug)}
      className="group block rounded-card border border-line bg-card p-6 transition-colors hover:border-line-dark"
    >
      <div className="flex items-center gap-3 text-xs">
        {report.period && (
          <span className="rounded-ui bg-primary px-2 py-0.5 font-bold text-card">{report.period}</span>
        )}
        <time className="text-ink-muted">{report.date}</time>
      </div>
      <h3 className="mt-3 font-display text-lg font-bold text-ink group-hover:text-primary">{report.title}</h3>
      <p className="mt-1 text-sm text-ink-sub">{report.description}</p>
    </Link>
  );
}
