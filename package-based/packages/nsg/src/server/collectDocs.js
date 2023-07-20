import fs from "fs";
import db from "./db.js";
import path from "path";

const collectDocs = () => {
  const docPath = path.join(process.cwd(), "docs");
  const docDir = fs.readdirSync(docPath);
  docDir.forEach(fileName => {
    const file = path.join(docPath, fileName);
    const stats = fs.statSync(file);

    console.log(stats.isDirectory());
  });
  console.log(docDir);
};

collectDocs();

export default collectDocs;
