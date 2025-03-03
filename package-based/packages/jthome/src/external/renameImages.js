const fs = require("fs");
const { nanoid } = require("nanoid");

const directoryArg = process.argv[2];
if (!directoryArg) return;

const handleError = (error) => {
  process.stderr.write(`${error}\n`);
};

const logRename = (oldName, newName) => {
  process.stdout.write(`${oldName} --> ${newName}\n`);
};

const readWebpFiles = (dirPath) => {
  const dir = fs.readdirSync(dirPath);
  const webpFiles = dir.filter((file) => file.endsWith(".webp"));
  return webpFiles;
};

const renameFilesWithTempNames = async () =>
  new Promise((resolve, reject) => {
    const renamedFiles = [];
    try {
      const rawFiles = readWebpFiles(directoryArg);
      if (rawFiles.length === 0) {
        process.stdout.write(`No .webp files found in ${directoryArg}\n`);
      }

      rawFiles.forEach((file) => {
        const oldFileName = `${directoryArg}${file}`;
        const newFileName = `${directoryArg}${nanoid(16)}.webp`;
        fs.renameSync(oldFileName, newFileName);
        logRename(oldFileName, newFileName);
        renamedFiles.push(newFileName);
      });

      resolve(renamedFiles);
    } catch (e) {
      handleError(e);
      reject(e);
    }
  });

const renameFiles = async (fileNames) =>
  new Promise((resolve, reject) => {
    try {
      fileNames.forEach((file, i) => {
        const newImageName = `img${i + 1}.webp`;
        const newFileName = `${directoryArg}${newImageName}`;
        fs.renameSync(file, newFileName);
        logRename(file, newFileName);
        resolve();
      });
    } catch (e) {
      handleError(e);
      reject(e);
    }
  });

renameFilesWithTempNames()
  .then((tempFileNames) =>
    renameFiles(tempFileNames)
      .then(() => {
        process.stdout.write("Renamed files successfully\n");
      })
      .catch((e) => handleError(e)),
  )
  .catch((e) => handleError(e));
