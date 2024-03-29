import autoprefixer from "autoprefixer";
import crypto from "crypto";
import cssnano from "cssnano";
import ejs from "ejs";
import fs from "fs";
import { marked } from "marked";
import path from "path";
import postcss from "postcss";

// Optional overrides where key = endpoint
const TAGS = {
  "/home": "main",
  "/table-of-contents": "main,navigation"
};

const TITLES = {
  "/home": "The Neodigital Survival Guide",
  "/table-of-contents": "Table of Contents"
};

// Utilities
const capitalize = str => `${str.charAt(0).toUpperCase()}${str.substring(1)}`;

const getHash = str => {
  const hash = crypto.createHash("md5").update(str).digest("hex");
  return hash.substring(hash.length - 8);
};

const getTitle = endpoint => {
  const splitEndpoint = endpoint.split("/");
  const docTitle = splitEndpoint[splitEndpoint.length - 1].replace(".md", "");
  const override = TITLES[endpoint];
  return override ? `<h1>${override}</h1>` : `<h1>${capitalize(docTitle)}</h1>`;
};

// Prep
const clearAndCreateDist = () => {
  const distPath = path.join(process.cwd(), "dist");
  fs.rmSync(distPath, { force: true, recursive: true });
  process.stdout.write(`ᕦ(ò_óˇ)ᕤ Deleted dist directory\n`);
  fs.mkdirSync(distPath);
  fs.mkdirSync(`${distPath}/pages`);
  fs.mkdirSync(`${distPath}/styles`);
  fs.mkdirSync(`${distPath}/styles/fonts`);
  process.stdout.write(`[o_o] Created empty dist directory\n`);
};

const tableOfContents = [];
const collectTableOfContents = () => {
  const fileContent = fs.readFileSync(
    path.join(process.cwd(), "docs/table-of-contents.md"),
    "utf8"
  );
  fileContent.split("\n").forEach(line => {
    const title = line.substring(line.indexOf("[") + 1, line.indexOf("]"));
    if (!title) return;
    const link = line.substring(line.indexOf("(") + 1, line.indexOf(")"));
    tableOfContents.push({ href: link, name: title });
  });
};

// Styles
const renderCss = async () => {
  const srcContent = fs.readFileSync(
    path.join(process.cwd(), "src/styles/look.css"),
    "utf8"
  );
  const processedStyles = await postcss([autoprefixer, cssnano]).process(
    srcContent,
    { from: undefined }
  );
  const fileName = `look-${getHash(processedStyles.css)}.css`;
  fs.writeFileSync(
    path.join(process.cwd(), "dist/styles", fileName),
    processedStyles.css
  );
  process.stdout.write(`♪ヽ( ⌒o⌒)♪ Styles written to ${fileName}\n`);
  return fileName;
};

const copyFonts = () => {
  const fontDirectory = fs.readdirSync(
    path.join(process.cwd(), "src/styles/fonts/")
  );
  fontDirectory.forEach(fontFile => {
    fs.copyFileSync(
      path.join(process.cwd(), "src/styles/fonts", fontFile),
      path.join(process.cwd(), "dist/styles/fonts/", fontFile)
    );
  });
};

// Markdown to HTML
const renderMarkdownFile = (mdFilePath, styleFileName) => {
  const endpoint = mdFilePath
    .replace(`${process.cwd()}/docs`, "")
    .replace(".md", "");
  const rawBody = fs.readFileSync(mdFilePath, "utf8");
  const html = marked.parse(rawBody, {
    headerIds: false,
    mangle: false
  });
  const title = getTitle(endpoint);
  const currentTocIndex = tableOfContents.map(entry => entry.href).indexOf(endpoint);
  if (currentTocIndex === -1) {
    process.stderr.write(`Could not find table of contents entry for ${endpoint}\n`);
    return;
  }
  const previousPage = tableOfContents[currentTocIndex - 1] || { href: "/home", name: "Home" };
  const nextPage = tableOfContents[currentTocIndex + 1] || { href: "/home", name: "Home" };

  const doc = {
    body: html,
    endpoint,
    previousHref: previousPage.href,
    previousName: previousPage.name || "",
    nextHref: nextPage.href || "",
    nextName: nextPage.name || "",
    styleFileName,
    tags: TAGS[endpoint] || "",
    title
  };

  ejs.renderFile(
    path.join(process.cwd(), "src/pages/template.ejs"),
    doc,
    {},
    (err, str) => {
      if (err) {
        process.stderr.write(`Error rendering ${doc.title}\n`);
        throw new Error(err);
      }
      const destinationPath = mdFilePath
        .replace("docs", "dist/pages")
        .replace(".md", ".html");
      fs.writeFileSync(destinationPath, str);
      process.stdout.write(`/(o.o)/ Wrote endpoint ${endpoint}\n`);
    }
  );
};

const renderDirectory = (dirPath, styleFileName) => {
  const dir = fs.readdirSync(dirPath);
  dir.forEach(fileName => {
    const file = path.join(dirPath, fileName);
    const stats = fs.statSync(file);
    if (stats.isDirectory()) {
      fs.mkdirSync(file.replace("docs", "dist/pages"));
      renderDirectory(file, styleFileName);
      return;
    }
    if (!fileName.endsWith(".md")) return;
    renderMarkdownFile(file, styleFileName);
  });
};

collectTableOfContents();
clearAndCreateDist();
const styleFileName = await renderCss();
copyFonts();
const docDirectory = path.join(process.cwd(), "docs");
process.stdout.write(`ة_ة Preparing to render docs in ${docDirectory}\n...\n`);
renderDirectory(docDirectory, styleFileName);
process.stdout.write("...\nDone! \\(^-^)/\n");
