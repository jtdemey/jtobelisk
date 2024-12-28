import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import logger from "./logger.js";
import morgan from "morgan";
import router from "./routes.js";
import { createWebSocketServer } from "./socketServer.js";
import siteModules from "./modules.js";

const dev = process.env.NODE_ENV !== "production";
const port = process.env.SERVER_PORT || 3000;
process.on("SIGINT", () => process.exit());

try {
    const expressApp = express();
    expressApp.use(bodyParser.json());
    if (dev) {
        expressApp.use(cors());
    }
    expressApp.use(morgan("short"));
    expressApp.use("/", router);
    expressApp.use(express.static("dist"));

    const enabledSiteModules = await siteModules.enableSiteModules(logger);
    siteModules.onHttpServerInit(enabledSiteModules, expressApp, router);

    const httpServer = expressApp.listen(port, (err) => {
        if (err) throw err;
        logger.info(
            `Ready on localhost:${port} - env ${
                dev ? "development" : "production"
            }`
        );
    });

    const wsServer = createWebSocketServer(expressApp, enabledSiteModules);
    httpServer.on("upgrade", (req, socket, head) => {
        wsServer.handleUpgrade(req, socket, head, (ws) =>
            wsServer.emit("connection", ws, req)
        );
    });
} catch (e) {
    logger.error(e);
    process.exit(1);
}
