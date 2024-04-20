import cardiology from "./cardiology/cardiology.js";
import { makeGameSuite } from "./gamesuite/gameSuite.js";
import { WebSocketServer } from "ws";

export const createWebSocketServer = (server) => {
  const wss = new WebSocketServer({
    perMessageDeflate: false,
    server: server,
  });
  wss.gs = makeGameSuite();
  wss.gs.startIdleClock();
  wss.on("connection", (ws) => {
    ws.on("message", (e) => {
      cardiology.handleSocketMessage(ws, e);
      wss.gs.handleSocketMsg(wss, ws, e);
    });
  });
  return wss;
};
