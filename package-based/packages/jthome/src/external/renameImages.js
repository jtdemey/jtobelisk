const fs = require("fs");
const { nanoid }= require("nanoid");

const directoryArg = process.argv[2];
if (!directoryArg) return;

const readWebpFiles = dirPath => {
  const dir = fs.readdirSync(dirPath);
  const webpFiles = dir.filter(file => file.endsWith(".webp"));
  return webpFiles;
};

const logRename = (oldName, newName) => {
  process.stdout.write(`${oldName} --> ${newName}\n`);
};

const rawFiles = readWebpFiles(directoryArg);
rawFiles.forEach((file) => {
  const oldFileName = `${directoryArg}${file}`;
  const newFileName = `${directoryArg}${nanoid(16)}.webp`;
  // fs.renameSync(oldFileName, newFileName);
  logRename(oldFileName, newFileName);
});
process.stdout.write("Renamed files with temporary names\n");

setTimeout(() => {
  const renamedFiles = readWebpFiles(directoryArg);
  renamedFiles.forEach((file, i) => {
    const oldFileName = `${directoryArg}${file}`;
    const newImageName = `img${i + 1}.webp`;
    const newFileName = `${directoryArg}${newImageName}`;
    // fs.renameSync(fullFileName, newFullFileName);
    logRename(oldFileName, newFileName);
  });
  process.stdout.write("Renamed files successfully\n");
}, 1000);
