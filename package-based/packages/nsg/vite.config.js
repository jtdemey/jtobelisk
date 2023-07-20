import { defineConfig } from "vite";

export default defineConfig({
	build: {
		emptyOutDir: true,
		outDir: "../dist",
		rollupOptions: {
			input: "src/pages/index.html"
		}
	},
	publicDir: "../public",
	root: "src"
});
