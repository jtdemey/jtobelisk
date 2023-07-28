import express from "express";
import path from "path";
import db from "./db";

const app = express();

app.get("/", function (_, res) {
  res.redirect("/home");
});

const docs = db.prepare("SELECT * FROM docs").all();
const verifyDoc = doc => {
  ["id", "body", "endpoint", "tags", "title"].forEach(attr => {
    if (!doc.attr) {
      stderr.write(`No attribute ${attr} found on doc ${doc.title || "no title"}`);
    }
  });
};

docs.forEach(doc => {
  verifyDoc(doc);
  app.get(doc.endpoint, (_, res) => {
    res.sendFile(path.join(process.cwd(), "dist/pages", `${doc.endpoint}.html`));
  });
  stdout.write(`Added route ${doc.endpoint} for ${doc.title}`);
});


app.listen(3000);
