import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  tags: string[];
  thumbnail?: string;
  draft: boolean;
}

export interface Post extends PostMeta {
  content: string; // frontmatter 를 제외한 마크다운 본문
}

/** 발행 글 전체 — draft 제외, 날짜 역순. 깨진 파일은 빌드를 막지 않고 경고 후 스킵. */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readPostFile(f))
    .filter((p): p is Post => p !== null && !p.draft)
    .sort((a, b) => (a.date === b.date ? (a.slug < b.slug ? 1 : -1) : a.date < b.date ? 1 : -1))
    .map(({ content: _content, ...meta }) => meta);
}

/** slug 로 글 1건. draft 도 반환하므로 호출부에서 draft 를 걸러야 한다. 없으면 null. */
export function getPost(slug: string): Post | null {
  return readPostFile(`${slug}.md`);
}

/** 마크다운 → HTML. GFM(표·체크박스) 지원, 본문 안 raw HTML 은 안전하게 제거. */
export async function renderMarkdown(md: string): Promise<string> {
  const out = await remark().use(remarkGfm).use(remarkHtml, { sanitize: true }).process(md);
  return String(out);
}

function readPostFile(filename: string): Post | null {
  const filePath = path.join(POSTS_DIR, filename);
  if (!fs.existsSync(filePath)) return null;
  try {
    const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
    if (!data.title || !data.description || !data.date) {
      console.warn(`[posts] ${filename} 스킵 — frontmatter 필수 필드(title·description·date) 누락`);
      return null;
    }
    return {
      slug: filename.replace(/\.md$/, ""),
      title: String(data.title),
      description: String(data.description),
      date: toDateString(data.date),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      thumbnail: typeof data.thumbnail === "string" ? data.thumbnail : undefined,
      draft: data.draft === true,
      content,
    };
  } catch (err) {
    console.warn(`[posts] ${filename} 스킵 — 파싱 실패:`, err);
    return null;
  }
}

function toDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}
