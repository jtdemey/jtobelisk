import dotenv from "dotenv";
import fs from "fs-extra";
import { stdout } from "process";

dotenv.config();

const DEFAULT_DESTINATION = "./dist/";

const INCLUDED_PACKAGES = [
    "../jthome/dist/",
    "../imposter/dist/",
    /*
    [
        `${process.env.SITE_MODULE_REPOSITORY_DIRECTORY}adventurebook/dist/`,
        "adventure_book/",
    ],
    */
];

const copyFiles = () => {
    for (const packageOrigin of INCLUDED_PACKAGES) {
        if (Array.isArray(packageOrigin)) {
            const destination = `${DEFAULT_DESTINATION}${packageOrigin[1]}`;
            fs.mkdirSync(destination);
            fs.copySync(packageOrigin[0], destination, { overwrite: false });
            stdout.write(`Got ${packageOrigin[0]}\n`);
        } else {
            fs.copySync(packageOrigin, DEFAULT_DESTINATION, {
                overwrite: false,
            });
            stdout.write(`Got ${packageOrigin}\n`);
        }
    }
    stdout.write("Copying complete!\n");
};

fs.removeSync(DEFAULT_DESTINATION, { force: true, recursive: true });
stdout.write("Cleared destination directory\n");
copyFiles();
