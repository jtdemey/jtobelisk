import ejs from "ejs";
import fs from "fs";
import { marked } from "marked";
import path from "path";

const ENDPOINTS = {};
const TAGS = {};
const TITLES = {
  "/toc": "Table of Contents",
};

const getTags = (endpoint) => TAGS[endpoint] || "";
const getTitle = (endpoint) =>
  TITLES[endpoint] ||
  `<h1>${endpoint
    .replace(`${process.cwd()}/docs`, "")
    .replace(".md", "")}</h1>`;

const renderMarkdownFile = (mdFilePath) => {
  const endpoint = mdFilePath
    .replace(`${process.cwd()}/docs`, "")
    .replace(".md", "");
  const rawBody = fs.readFileSync(mdFilePath, "utf8");
  const html = marked.parse(rawBody, {
    headerIds: false,
    mangle: false,
  });

  const template = path.join(process.cwd(), "src/pages/template.ejs");
  const doc = {
    body: html,
    endpoint,
    tags: getTags(mdFilePath),
    title: getTitle(mdFilePath),
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

const renderDirectory = (dirPath) => {
  const dir = fs.readdirSync(dirPath);
  dir.forEach((fileName) => {
    const file = path.join(docPath, fileName);
    const stats = fs.statSync(file);
    if (stats.isDirectory()) {
      renderDirectory(file);
      return;
    }
    renderMarkdownFile(file);
  });
};

const docPath = path.join(process.cwd(), "docs");
renderDirectory(docPath);
