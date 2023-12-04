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
  "/toc": "main,navigation"
};

const TITLES = {
  "/home": "The Neodigital Survival Guide",
  "/toc": "Table of Contents"
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

let previousHref = undefined;
let nextHref = undefined;


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

  const doc = {
    body: html,
    endpoint,
    previousHref: "test",
    nextHref: "test2",
    styleFileName,
    tags: TAGS[endpoint] || "",
    title: getTitle(endpoint)
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

const actOnDirectory = (dirPath, styleFileName, action) => {
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
    action(file, styleFileName);
  });
};

const renderDirectory = (dirPath, styleFileName) =>
  actOnDirectory(dirPath, styleFileName, (file, styleFileName) => renderMarkdownFile(file, styleFileName))

clearAndCreateDist();
const styleFileName = await renderCss();
copyFonts();
const docDirectory = path.join(process.cwd(), "docs");
process.stdout.write(`ة_ة Preparing to render docs in ${docDirectory}\n...\n`);
renderDirectory(docDirectory, styleFileName);
process.stdout.write("...\nDone! \\(^-^)/\n");
