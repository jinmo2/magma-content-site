/**
 * 룩북·비주얼 이미지 자리. 지금은 브랜드 톤 placeholder.
 * 이미지가 준비되면 이 컴포넌트 자리를 <img>/next Image 로 교체하거나 src 를 받게 확장합니다.
 */
export default function ImageSlot({
  ratio = "4/5",
  label = "이미지",
  className = "",
}: {
  ratio?: string;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-card border border-line bg-card ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <span className="font-display text-sm tracking-[0.2em] text-ink-muted">{label}</span>
    </div>
  );
}
