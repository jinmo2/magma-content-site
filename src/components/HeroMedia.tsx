import Image from "next/image";

/**
 * TODO SLOT: 히어로 배경 영상.
 * 지금은 패션 브랜드 무드가 보이는 poster 이미지 무대입니다.
 * 6.7 「히어로 영상 생성 후 삽입」에서 public/hero.mp4 를 만들고
 * 아래 img 를 video 로 교체해 배경 영상을 넣습니다:
 *
 *   <video autoPlay muted loop playsInline poster="/images/magma-hero-poster.png"
 *          className="h-full w-full object-cover">
 *     <source src="/hero.mp4" type="video/mp4" />
 *   </video>
 *
 * 영상이 없어도 아래 poster 이미지로 완전히 동작해야 합니다.
 */
export default function HeroMedia() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Image
        src="/images/magma-hero-poster.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-canvas/70 via-canvas/35 to-canvas/15" />
    </div>
  );
}
