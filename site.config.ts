/**
 * 회사 정체성 단일 진실원천.
 * 6.1 실습: 헤르메스에게 이 파일을 여러분 회사로 바꿔 달라고 요청하는 것부터 시작합니다.
 * 색·글꼴은 이 파일이 아니라 DESIGN.md + src/styles/tokens.css 담당입니다 (6.7).
 */
export interface SiteConfig {
  company: { name: string; tagline: string; description: string };
  links: Record<string, string>;
  cta: { enabled: boolean; label: string; href: string };
}

export const siteConfig: SiteConfig = {
  company: {
    name: "MAGMA",
    tagline: "나이 드는 방식을, 다시 입다",
    description:
      "억지로 젊어 보이려 애쓰지 않고, 자기답게 멋지게 나이 드는 3040 남성을 위한 옷. 유행보다 오래 입을 것을, 과장보다 단정함을 택합니다.",
  },
  links: {
    github: "https://github.com/dandacompany",
  },
  cta: {
    // 6.6 「SNS 자동발행 + CTA」에서 구현·활성화하는 확장 슬롯
    enabled: false,
    label: "",
    href: "",
  },
};
