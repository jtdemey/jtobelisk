import fs from "fs-extra";
import { stderr, stdout } from "process";

const DESTINATION = "./dist/";

const INCLUDED_PACKAGES = [
	"../jthome/dist/",
	"../imposter/dist/",
];

const copyFiles = () => {
	for (const packageOrigin of INCLUDED_PACKAGES) {
		stdout.write(`Copying contents of ${packageOrigin}...\n`);
		fs.copySync(packageOrigin, DESTINATION, { overwrite: false });
	}
	stdout.write("Copying complete!\n");
};

fs.stat(DESTINATION, (err, stats) => {
	if (err) {
		stderr.write(err + "\n");
		stderr.write(`${DESTINATION} directory not found, creating...\n`);
		fs.mkdirSync(DESTINATION);
	}
	if (!stats.isDirectory()) {
		stderr.write(`${DESTINATION} is not a directory\n`);
		process.exit(1);
	}
	fs.rmSync(DESTINATION, { force: true, recursive: true });
	stdout.write("Cleared destination directory\n");
	copyFiles();
});
