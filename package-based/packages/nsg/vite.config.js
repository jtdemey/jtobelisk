import db from "./src/server/db.js";
import { defineConfig } from "vite";

const docs = db.prepare("SELECT * FROM docs").all();
const rollupInputs = {};
docs.forEach(doc => {
	rollupInputs[doc.title] = `src/pages${doc.endpoint}.html`;
});
console.log(rollupInputs);

export default defineConfig({
	build: {
		emptyOutDir: true,
		outDir: "../dist",
		rollupOptions: {
			input: rollupInputs
		}
	},
	publicDir: "../public",
	root: "src/"
});
