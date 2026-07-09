import fs from "fs";
import path from "path";

const root = process.cwd();
const warnings = [];
const errors = [];

checkNode();
checkEnv();
checkContent("posts");
checkContent("reports");

for (const warning of warnings) console.warn(`WARN ${warning}`);
for (const error of errors) console.error(`FAIL ${error}`);

if (errors.length > 0) {
  console.error(`\npreflight failed: ${errors.length} error(s), ${warnings.length} warning(s)`);
  process.exit(1);
}

console.log(`preflight passed: ${warnings.length} warning(s)`);

function checkNode() {
  const major = Number(process.versions.node.split(".")[0]);
  if (major < 20) errors.push(`Node.js 20 이상이 필요합니다. 현재 버전: ${process.version}`);
}

function checkEnv() {
  const envPath = path.join(root, ".env.local");
  if (!fs.existsSync(envPath)) {
    warnings.push(".env.local 이 없습니다. 발행 API 테스트 전 .env.example 을 복사해 값을 채우세요.");
    return;
  }
  const env = parseEnv(fs.readFileSync(envPath, "utf8"));
  if (!env.PUBLISH_API_KEY) warnings.push("PUBLISH_API_KEY 가 비어 있습니다. 발행 API 인증에 필요합니다.");
  if (env.GITHUB_REPO?.startsWith("dandacompany/")) {
    warnings.push("GITHUB_REPO 가 dandacompany/... 입니다. 수강생 배포에서는 본인계정/본인저장소로 바꾸세요.");
  }
  if (env.GITHUB_REPO === "your-account/magma-content-site") {
    warnings.push("GITHUB_REPO 가 예시값입니다. Vercel 배포 전 본인 repo 로 바꾸세요.");
  }
}

function checkContent(collection) {
  const dir = path.join(root, "content", collection);
  if (!fs.existsSync(dir)) {
    warnings.push(`content/${collection}/ 폴더가 없습니다.`);
    return;
  }
  for (const filename of fs.readdirSync(dir).filter((file) => file.endsWith(".md"))) {
    const slug = filename.replace(/\.md$/, "");
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
      errors.push(`content/${collection}/${filename}: 파일명은 영문 소문자·숫자·하이픈만 사용하세요.`);
    }
    const frontmatter = readFrontmatter(path.join(dir, filename));
    for (const field of ["title", "description", "date"]) {
      if (!frontmatter[field]) errors.push(`content/${collection}/${filename}: frontmatter ${field} 필드가 필요합니다.`);
    }
    if (frontmatter.thumbnail?.startsWith("/") && !fs.existsSync(path.join(root, "public", frontmatter.thumbnail))) {
      errors.push(`content/${collection}/${filename}: thumbnail 파일이 public${frontmatter.thumbnail} 에 없습니다.`);
    }
  }
}

function readFrontmatter(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  return Object.fromEntries(
    match[1]
      .split("\n")
      .map((line) => line.match(/^([A-Za-z0-9_-]+):\s*(.+)?$/))
      .filter(Boolean)
      .map((matchLine) => [matchLine[1], matchLine[2] ?? ""]),
  );
}

function parseEnv(text) {
  return Object.fromEntries(
    text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"))
      .map((line) => {
        const index = line.indexOf("=");
        if (index === -1) return [line, ""];
        return [line.slice(0, index), line.slice(index + 1)];
      }),
  );
}
