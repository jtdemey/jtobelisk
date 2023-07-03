import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	build: {
		emptyOutDir: true,
		outDir: "../dist",
		rollupOptions: {
			input: {
				imposter: "./src/index.jsx",
				imposterRoot: "./src/imposter.html"
			}
		}
	},
	plugins: [react()],
	publicDir: "../public",
	root: "src",
	server: {
		open: "imposter.html"
	}
});
