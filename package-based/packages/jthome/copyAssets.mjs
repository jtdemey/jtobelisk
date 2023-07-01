import fs from "fs-extra";
import { stderr } from "process";

let distExists = false;

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
	distExists = true;
});

if (distExists === false) return;

fs.rmSync("../jtwebserver/dist/", { force: true, recursive: true });

