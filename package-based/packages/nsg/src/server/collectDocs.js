import createDb from "./createSchema.js";
import fs from "fs";
import { executeTransaction } from "./db.js";
import path from "path";

const ENDPOINTS = {};
const TAGS = {};
const TITLES = {};

const getEndpointFromPath = (filePath) => {
  return ENDPOINTS[filePath] || filePath.replace(`${process.cwd()}/docs`, "");
};
const getTagsFromPath = (filePath) => TAGS[filePath] || filePath;
const getTitleFromPath = (filePath) => TITLES[filePath] || filePath;

const amass = (filePath) => {
  const recordToInsert = {
    body: "",
    endpoint: getEndpointFromPath(filePath),
    tags: getTagsFromPath(filePath),
    title: getTitleFromPath(filePath)
  };
  console.log(recordToInsert);
  executeTransaction(
    `INSERT INTO docs (body, endpoint, tags, title) VALUES (@body, @endpoint, @tags, @title)`,
    recordToInsert
  );
};

createDb();
executeTransaction("DELETE FROM docs");

const docPath = path.join(process.cwd(), "docs");
const docDir = fs.readdirSync(docPath);
docDir.forEach((fileName) => {
  const file = path.join(docPath, fileName);
  const stats = fs.statSync(file);
  amass(file);
  console.log(file.replace(process.cwd(), ""));
});
console.log(docDir);
