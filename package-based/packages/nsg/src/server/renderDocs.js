import autoprefixer from "autoprefixer";
import crypto from "crypto";
import cssnano from "cssnano";
import ejs from "ejs";
import fs from "fs";
import { marked } from "marked";
import path from "path";
import postcss from "postcss";

// Key = endpoint
const TAGS = {
  "/home": "main",
  "/toc": "main,navigation"
};
const TITLES = {
  "/toc": "Table of Contents"
};

const getHash = str => {
  const hash = crypto.createHash("md5").update(str).digest("hex");
  return hash.substring(hash.length - 8);
};

const getTitle = endpoint =>
  TITLES[endpoint] ||
  `<h1>${endpoint
    .replace(`${process.cwd()}/docs`, "")
    .replace(".md", "")}</h1>`;

const renderMarkdownFile = mdFilePath => {
  const endpoint = mdFilePath
    .replace(`${process.cwd()}/docs`, "")
    .replace(".md", "");
  const rawBody = fs.readFileSync(mdFilePath, "utf8");
  const html = marked.parse(rawBody, {
    headerIds: false,
    mangle: false
  });

  const template = path.join(process.cwd(), "src/pages/template.ejs");
  const doc = {
    body: html,
    endpoint,
    tags: TAGS[endpoint] || "",
    title: getTitle(mdFilePath)
  };

  ejs.renderFile(template, doc, {}, (err, str) => {
    if (err) {
      process.stderr.write(`Error rendering ${doc.title}\n`);
      return;
    }
    const destinationPath = mdFilePath
      .replace("docs", "dist/pages")
      .replace(".md", ".html");
    fs.writeFileSync(destinationPath, str);
    process.stdout.write(`Rendered ${endpoint} to ${destinationPath}\n`);
  });
};

const renderDirectory = dirPath => {
  const dir = fs.readdirSync(dirPath);
  dir.forEach(fileName => {
    const file = path.join(docPath, fileName);
    const stats = fs.statSync(file);
    if (stats.isDirectory()) {
      renderDirectory(file);
      return;
    }
    renderMarkdownFile(file);
  });
};

const renderCss = async () => {
  const lookPath = path.join(process.cwd(), "src/styles/look.css");
  const lookContent = fs.readFileSync(lookPath, "utf8");
  const processedStyles = await postcss([autoprefixer, cssnano]).process(
    lookContent,
    { from: undefined }
  );
  const css = processedStyles.css;
  const contentHash = getHash(css);
  const fileName = path.join(process.cwd(), "dist", `look-${contentHash}.css`);
  fs.writeFileSync(fileName, css);
};

const docPath = path.join(process.cwd(), "docs");
// renderDirectory(docPath);
renderCss();
