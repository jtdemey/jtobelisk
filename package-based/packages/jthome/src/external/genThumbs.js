const { exec } = require("child_process");
const fs = require("fs");

const IMAGE_COUNT = 43;
const WIDTH = 300;

const directoryArg = process.argv[2];
if (!directoryArg) return;

const dir = fs.readdirSync(directoryArg);
const webpFiles = dir.filter(file => file.endsWith(".webp"));
exec("ls -l", (error, stdout, stderr) => {
	console.log(stdout);
});
webpFiles.forEach((file) => {
  // console.log(file);
	const newFileName = `${file.split(".")[0]}-thumb.webp`;
	console.log(newFileName);
	// exec(`ffmpeg -i ${file} -vf scale=${WIDTH}:-1 `);
});
