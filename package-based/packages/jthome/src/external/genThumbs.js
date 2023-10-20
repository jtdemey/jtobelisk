const { exec } = require("child_process");
const fs = require("fs");

const WIDTH = 400;

const directoryArg = process.argv[2];
if (!directoryArg) return;

const dir = fs.readdirSync(directoryArg);
const webpFiles = dir.filter((file) => file.endsWith(".webp"));

webpFiles.forEach((file) => {
  const srcFileName = `${directoryArg}${file}`;
  const newFileName = `${directoryArg}thumbs/${file}`;
	exec(`ffmpeg -i ${srcFileName} -vf scale=${WIDTH}:-1 ${newFileName}`, (error, stdout, stderr) => {
		if (error) {
			process.stderr.write(`Error processing ${file}\n`);
			process.stderr.write(stderr);
			return;
		}
		process.stdout.write(stdout);
		process.stdout.write(`Wrote ${file}\n`);
	});
});
