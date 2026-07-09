interface DashboardEmbedProps {
  url: string;
  title?: string;
}

export default function DashboardEmbed({ url, title = "실적 대시보드" }: DashboardEmbedProps) {
  const safeUrl = getSafeDashboardUrl(url);
  if (!safeUrl) {
    return (
      <div className="my-10 rounded-card border border-line bg-card p-5 text-sm text-ink-sub">
        dashboardUrl 형식을 확인하세요. http(s) URL만 대시보드로 표시합니다.
      </div>
    );
  }

  return (
    <section className="my-12">
      <div className="mb-3 flex items-center justify-between border-b border-line pb-3">
        <p className="eyebrow">Dashboard</p>
        <a className="text-xs text-ink-muted underline underline-offset-4" href={safeUrl} target="_blank" rel="noreferrer">
          새 창으로 열기
        </a>
      </div>
      <div className="overflow-hidden rounded-card border border-line bg-card">
        <iframe
          title={title}
          src={safeUrl}
          className="h-[420px] w-full bg-card"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}

function getSafeDashboardUrl(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    if (!isAllowedHost(url.hostname)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function isAllowedHost(hostname: string): boolean {
  const allowlist = process.env.NEXT_PUBLIC_DASHBOARD_HOST_ALLOWLIST;
  if (!allowlist) return true;
  return allowlist
    .split(",")
    .map((host) => host.trim())
    .filter(Boolean)
    .some((host) => hostname === host || hostname.endsWith(`.${host}`));
}
