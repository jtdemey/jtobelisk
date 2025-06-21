import { defineConfig } from "vite";

export default defineConfig({
	build: {
		emptyOutDir: true,
		outDir: "../dist",
		rollupOptions: {
			input: {
				home: "src/home.html",
				software: "src/software.html",
				media: "src/media.html",
				gallery: "src/gallery.html",
				photos: "src/photos.html",
				poems: "src/poems.html",
				contact: "src/contact.html",
			}
		}
	},
	publicDir: "../public",
	root: "src"
});
