import { exec } from "child_process";
import { readdirSync } from "fs";

const handleError = e => {
  console.error(e);
  process.exit(1);
};

if (process.argv.length < 3) {
  handleError("Expected path argument");
}

const targetDir = process.argv[2];
const files = readdirSync(targetDir);
if (files.length < 1) {
  handleError(`Unable to read files in ${targetDir}`);
}

files.forEach(fileName => {
  const srcFileName = `${targetDir}${fileName}`;
  const dstFileName = `${srcFileName.substring(0, srcFileName.length - 4)}.webp`;
  exec(`ffmpeg -i ${srcFileName} -c:v libwebp ${dstFileName}`, (error, _, stderr) => {
    if (error) {
      handleError(error.message);
      return;
    }
    if (stderr) {
      handleError(stderr);
      return;
    }
  });
  console.log(`Wrote ${dstFileName}`);
});

console.log("Converted files successfully!");
