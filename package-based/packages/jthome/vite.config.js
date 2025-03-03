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
				photos: "src/photos.html",
				poems: "src/poems.html",
				meetingMinutes: "src/meeting-minutes.html",
				thingsToKnow: "src/things-to-know.html",
				contact: "src/contact.html",
				hireMe: "src/hire_me.html",
			}
		}
	},
	publicDir: "../public",
	root: "src"
});
