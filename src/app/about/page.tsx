import type { Metadata } from "next";
import { siteConfig } from "@config";
import SectionHeading from "@/components/SectionHeading";
import ImageSlot from "@/components/ImageSlot";

export const metadata: Metadata = { title: "회사소개" };

const history = [
  {
    year: "2024",
    title: "질문에서 시작",
    body: "세 사람이 \"우리가 입고 싶은 옷이 없다\"는 문제에서 출발했습니다.",
  },
  {
    year: "2025",
    title: "첫 컬렉션",
    body: "절제된 캡슐 컬렉션을 공개하고, 자사몰로 첫 손님을 맞았습니다.",
  },
  {
    year: "2026",
    title: "운영의 뼈대",
    body: "전략기획실을 세우고, 감이 아니라 데이터로 다음 시즌을 준비합니다.",
  },
];

const values = [
  { name: "단정함", body: "과장하지 않습니다. 덜어낸 자리에 태도가 남습니다." },
  { name: "지속", body: "새것일 때보다 길들여졌을 때 더 좋아지는 옷을 만듭니다." },
  { name: "정직", body: "보이는 대로 만들고, 만든 대로 말합니다." },
  { name: "기본", body: "유행은 지나가도 기본은 남습니다. 시간이 지나도 유효한 것을 만듭니다." },
];

export default function AboutPage() {
  return (
    <div className="pb-16">
      {/* 슬로건 */}
      <section className="container-page py-24">
        <p className="eyebrow mb-4">{siteConfig.company.name}</p>
        <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight text-primary sm:text-5xl">
          {siteConfig.company.tagline}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-sub">
          {siteConfig.company.description}
        </p>
      </section>

      {/* 히스토리 */}
      <section className="container-page py-16">
        <SectionHeading eyebrow="히스토리" title="MAGMA가 걸어온 길" />
        <div className="grid gap-8 md:grid-cols-2">
          <ol className="space-y-8">
            {history.map((h) => (
              <li key={h.year} className="flex gap-6 border-t border-line pt-6">
                <span className="font-display text-2xl font-bold text-accent">{h.year}</span>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">{h.title}</h3>
                  <p className="mt-1 text-ink-sub">{h.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <ImageSlot ratio="4/5" label="브랜드 아카이브" className="hidden md:flex" />
        </div>
      </section>

      {/* 가치 */}
      <section className="container-page py-16">
        <SectionHeading eyebrow="가치" title="우리가 지키는 것" />
        <div className="grid gap-6 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.name} className="rounded-card border border-line bg-card p-6">
              <h3 className="font-display text-lg font-bold text-primary">{v.name}</h3>
              <p className="mt-2 text-ink-sub">{v.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
