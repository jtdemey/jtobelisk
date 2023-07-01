import { defineConfig } from "vite";

export default defineConfig({
	build: {
		emptyOutDir: true,
		outDir: "../dist",
		rollupOptions: {
			input: {
				about: "src/about.html",
				doodles: "src/doodles.html",
				home: "src/home.html"
			}
		}
	},
	publicDir: "../public",
	root: "src",
	server: {
		open: "home.html"
	}
});
