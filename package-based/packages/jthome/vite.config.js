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
				poems: "src/poems.html",
				contact: "src/contact.html",
				meetingMinutes: "src/meeting-minutes.html",
				thingsToKnow: "src/things-to-know.html",
				bast: "src/bast.html",
				bastWelcome: "src/bast_welcome.html"
			}
		}
	},
	publicDir: "../public",
	root: "src"
});
