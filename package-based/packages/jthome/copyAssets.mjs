import fs from "fs-extra";
import { stderr, stdout } from "process";

const copyAssets = () => {
	fs.stat("../jtwebserver/dist/", (err, stats) => {
		if (err) {
			stderr.write(err);
			stderr.write("../jtwebserver/dist directory not found");
			return;
		}
		if (!stats.isDirectory()) {
			stderr.write("../jtwebserver/dist is not a directory");
			return;
		}
		const origin = "./dist/";
		const destination = "../jtwebserver/dist/";

		fs.rmSync(destination, { force: true, recursive: true });
		fs.copySync(origin, destination, { overwrite: false });

		stdout.write(`Copied files from ${origin} to ${destination}\n`);
	});
};

copyAssets();
