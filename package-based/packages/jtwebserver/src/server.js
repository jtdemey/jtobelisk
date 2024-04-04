import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import logger from "./logger.js";
import morgan from "morgan";
import router from "./routes.js";
import { createWebSocketServer } from "./socketServer.js";
import { createEmailList } from "./emailList.js";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const port = process.env.SERVER_PORT || 3000;
process.on("SIGINT", () => process.exit());

try {
  createEmailList(
    "bast",
    router,
    "/bast/subscribe",
    "/bast/unsubscribe",
    "/bast/verify",
  );

  const expressApp = express();
  expressApp.use(bodyParser.json());
  if (dev) {
    expressApp.use(cors());
  }
  expressApp.use(morgan("short"));
  expressApp.use("/", router);
  expressApp.use(express.static("dist"));

  const httpServer = expressApp.listen(port, (err) => {
    if (err) throw err;
    logger.info(
      `Ready on localhost:${port} - env ${dev ? "development" : "production"}`,
    );
  });

  const wsServer = createWebSocketServer(expressApp);
  httpServer.on("upgrade", (req, socket, head) => {
    wsServer.handleUpgrade(req, socket, head, (ws) =>
      wsServer.emit("connection", ws, req),
    );
  });
} catch (e) {
  logger.error(e);
  process.exit(1);
}
