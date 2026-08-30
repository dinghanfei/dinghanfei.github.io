import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const repo = process.cwd();
const sourceRoot = "/private/tmp/flowus-batch";
const noteRoot = path.join(repo, "src/content/notes");
const publicRoot = path.join(repo, "public/notes");

const subjects = [
  {
    source: "algorithms",
    slug: "algorithm-foundations",
    title: "Algorithm Foundations",
    summary: "Systematic notes on algorithms, data structures, dynamic programming, graph theory, and competitive programming topics.",
    category: "Computer Science",
    tags: ["Algorithms", "Data Structures", "Dynamic Programming", "Graph Theory"],
    icon: "ALG",
    order: 20260820,
    sequence: ["基础算法", "数学知识", "数据结构", "STL", "并查集", "字符串", "线段树", "平衡树", "搜索与图论", "动态规划", "贪心", "蓝桥杯"],
    include: (name) => !name.includes("算法基础+a065") && !name.includes("算法设计与分析") && !name.includes("acm选修课杂记+a334"),
  },
  {
    source: "compiler",
    slug: "compiler-principles",
    title: "Compiler Principles",
    summary: "Course notes covering lexical analysis, parsing, runtime environments, and code generation.",
    category: "Computer Science",
    tags: ["Compiler", "Parsing", "Formal Languages"],
    icon: "CFG",
    order: 20260819,
    sequence: ["第二章", "第三章", "第四章", "第五章", "第六章", "第七章", "第八章"],
    include: (name) => /^第[二三四五六七八]章/.test(name),
  },
  {
    source: "network",
    slug: "computer-networks",
    title: "Computer Networks",
    summary: "Course notes covering the physical, data link, network, transport, and application layers.",
    category: "Computer Science",
    tags: ["Networks", "TCP/IP", "Protocols"],
    icon: "NET",
    order: 20260818,
    sequence: ["计算机网络-概述", "计算机网络-物理层", "数据链路层", "网络层", "运输层", "应用层"],
    include: (name) => !/^计算机网络\+0b7/.test(name),
  },
  {
    source: "private",
    slug: "toefl-notes",
    title: "TOEFL Notes",
    summary: "Study notes and practice materials for TOEFL reading, listening, speaking, and writing.",
    category: "Language Learning",
    tags: ["TOEFL", "English", "Writing", "Speaking"],
    icon: "EN",
    order: 20260817,
    sequence: ["reading", "listening", "speaking", "speaking — interview", "writing", "writing-email", "practice", "vince9120"],
    include: (name) => !/^托福 384/.test(name),
  },
  {
    source: "private2",
    slug: "research-paper-reading",
    title: "Practical Guide to Reading Research Papers",
    summary: "A practical workflow for finding, reading, organizing, and reviewing academic papers.",
    category: "Research Methods",
    tags: ["Research", "Paper Reading", "Workflow"],
    icon: "READ",
    order: 20260816,
    sequence: ["读论文方法技巧"],
    include: () => true,
  },
];

const cleanName = (filename) => path.basename(filename, path.extname(filename))
  .replace(/\+[0-9a-f]{8}-[0-9a-f-]{27,}$/i, "")
  .replace(/ [0-9a-f]{32}$/i, "")
  .replaceAll("+", " ")
  .trim();

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === "__MACOSX" || entry.name === ".DS_Store") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

function demoteHeadings(markdown) {
  return markdown.replace(/^(#{1,6})(\s+)/gm, (_, hashes, space) => `${"#".repeat(Math.min(6, hashes.length + 1))}${space}`);
}

function normalizeFences(markdown) {
  return markdown
    .replace(/^(\s*)```Plain(?: Text)?\s*$/gm, "$1```text")
    .replace(/^(\s*)```Objective-C\+\+\s*$/gm, "$1```cpp")
    .replace(/^(\s*)```C\+\+\s*$/gm, "$1```cpp");
}

async function importSubject(subject) {
  const base = path.join(sourceRoot, subject.source);
  const allFiles = await walk(base);
  const markdownFiles = allFiles
    .filter((file) => file.endsWith(".md") && subject.include(path.basename(file)))
    .sort((a, b) => {
      const aName = cleanName(a);
      const bName = cleanName(b);
      const rank = (name) => {
        const index = subject.sequence.findIndex((item) => name === item || name.startsWith(item));
        return index === -1 ? subject.sequence.length : index;
      };
      return rank(aName) - rank(bName) || aName.localeCompare(bName, "zh-CN", { numeric: true });
    });
  const assetDir = path.join(publicRoot, subject.slug);
  await mkdir(assetDir, { recursive: true });
  const hashes = new Map();
  let assetIndex = 0;

  async function localAsset(sourcePath) {
    const info = await stat(sourcePath);
    if (info.size > 50 * 1024 * 1024) return null;
    const data = await readFile(sourcePath);
    const hash = createHash("sha256").update(data).digest("hex");
    if (hashes.has(hash)) return hashes.get(hash);
    const ext = path.extname(sourcePath).toLowerCase() || ".bin";
    const outputName = `asset-${String(++assetIndex).padStart(3, "0")}${ext}`;
    await copyFile(sourcePath, path.join(assetDir, outputName));
    const publicPath = `/notes/${subject.slug}/${outputName}`;
    hashes.set(hash, publicPath);
    return publicPath;
  }

  const sections = [];
  for (const markdownFile of markdownFiles) {
    let markdown = await readFile(markdownFile, "utf8");
    const linkPattern = /(!?\[[^\]]*\])\(([^)]+)\)/g;
    const matches = [...markdown.matchAll(linkPattern)];
    for (const match of matches) {
      const rawTarget = match[2].trim().replace(/^<|>$/g, "");
      if (/^(https?:|mailto:|#)/i.test(rawTarget)) continue;
      let decoded;
      try { decoded = decodeURIComponent(rawTarget); } catch { decoded = rawTarget; }
      const sourcePath = path.resolve(path.dirname(markdownFile), decoded);
      if (path.extname(sourcePath).toLowerCase() === ".md") {
        markdown = markdown.replace(match[0], match[1].replace(/^!/, ""));
        continue;
      }
      try {
        const publicPath = await localAsset(sourcePath);
        markdown = markdown.replace(match[0], publicPath ? `${match[1]}(${publicPath})` : `${match[1].replace(/^!/, "")} *(attachment omitted)*`);
      } catch {
        markdown = markdown.replace(match[0], match[1].replace(/^!/, ""));
      }
    }
    markdown = normalizeFences(demoteHeadings(markdown.trim()));
    sections.push(`# ${cleanName(markdownFile)}\n\n${markdown}`);
  }

  const frontmatter = [
    "---",
    `title: ${JSON.stringify(subject.title)}`,
    `summary: ${JSON.stringify(subject.summary)}`,
    `category: ${JSON.stringify(subject.category)}`,
    `order: ${subject.order}`,
    'format: "Markdown"',
    `icon: ${JSON.stringify(subject.icon)}`,
    `tags: ${JSON.stringify(subject.tags)}`,
    "---",
    "",
  ].join("\n");
  await writeFile(path.join(noteRoot, `${subject.slug}.md`), frontmatter + sections.join("\n\n---\n\n") + "\n");
  return { slug: subject.slug, pages: markdownFiles.length, assets: assetIndex };
}

async function importMathPdfs() {
  const base = path.join(sourceRoot, "math");
  const files = (await walk(base)).filter((file) => file.toLowerCase().endsWith(".pdf"));
  const assetDir = path.join(publicRoot, "university-mathematics");
  await mkdir(assetDir, { recursive: true });
  const groups = new Map([["线性代数", []], ["概率论与数理统计", []], ["微积分笔记", []], ["微积分讲座", []]]);
  const hashes = new Set();
  let index = 0;
  for (const file of files.sort((a, b) => a.localeCompare(b, "zh-CN", { numeric: true }))) {
    const hash = createHash("sha256").update(await readFile(file)).digest("hex");
    if (hashes.has(hash)) continue;
    hashes.add(hash);
    const group = file.includes("线性代数") ? "线性代数" : file.includes("概率论") || file.includes("骨牌") || file.includes("概统") ? "概率论与数理统计" : file.includes("讲座") ? "微积分讲座" : "微积分笔记";
    const outputName = `math-${String(++index).padStart(3, "0")}.pdf`;
    await copyFile(file, path.join(assetDir, outputName));
    groups.get(group).push({ label: path.basename(file, ".pdf"), url: `/notes/university-mathematics/${outputName}` });
  }
  const sections = [...groups].map(([group, links]) => `# ${group}\n\n${links.map(({ label, url }) => `- [${label}](${url})`).join("\n")}`).join("\n\n---\n\n");
  const frontmatter = `---\ntitle: "University Mathematics Notes"\nsummary: "University notes and lecture materials on linear algebra, probability and statistics, and calculus."\ncategory: "Mathematics"\norder: 20260821\nformat: "PDF"\nicon: "∑"\ntags: ["Calculus", "Linear Algebra", "Probability"]\n---\n\n`;
  await writeFile(path.join(noteRoot, "university-mathematics.md"), frontmatter + sections + "\n");
  return { slug: "university-mathematics", pages: 4, assets: index };
}

await mkdir(noteRoot, { recursive: true });
await mkdir(publicRoot, { recursive: true });
const results = [];
for (const subject of subjects) results.push(await importSubject(subject));
results.push(await importMathPdfs());
console.log(JSON.stringify(results, null, 2));
