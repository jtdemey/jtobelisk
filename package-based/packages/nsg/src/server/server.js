import express from "express";
import fs from "fs";
import path from "path";

const PORT = 3000;

const app = express();

app.get("/", (_, res) => {
  res.redirect("/home");
});

const distPath = path.join(process.cwd(), "dist");
const pagesPath = path.join(distPath, "pages");

const addRoutesForDirectory = dirPath => {
  const files = fs.readdirSync(dirPath);
  files.forEach(fileName => {
    const filePath = path.join(dirPath, fileName);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      addRoutesForDirectory(filePath);
      return;
    }
    const endpoint = filePath.replace(pagesPath, "").replace(".html", "");
    app.get(endpoint, (_, res) => {
      res.sendFile(filePath);
    });
    process.stdout.write(`Added route ${endpoint}\n`);
  });
};

addRoutesForDirectory(pagesPath);

app.use("/assets", express.static(path.join(distPath, "assets")));
app.use("/styles", express.static(path.join(distPath, "styles")));

app.listen(PORT);
process.stdout.write(`Server listening on ${PORT}\n`);
