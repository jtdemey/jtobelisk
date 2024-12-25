import { WebSocketServer } from "ws";
import siteModules from "./modules.js";

export const createWebSocketServer = (server, enabledSiteModules) => {
  const wss = new WebSocketServer({
    perMessageDeflate: false,
    server: server,
  });
  siteModules.onSocketServerInit(enabledSiteModules, wss);
  wss.on("connection", (ws) => {
    ws.on("message", (e) => {
      siteModules.onSocketMessage(enabledSiteModules, wss, ws, e);
    });
  });
  return wss;
};
