import { defineConfig } from "vite";

export default defineConfig({
	build: {
		emptyOutDir: true,
		outDir: "../dist",
		rollupOptions: {
			input: {
				home: "src/pages/home.html",
				software: "src/pages/software.html",
				media: "src/pages/media.html",
				contact: "src/pages/contact.html"
			}
		}
	},
	publicDir: "../public",
	root: "src"
});
