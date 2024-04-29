import { MODULE_NAME } from "./cardiology.js";

export const COMMANDS = {
  ACCEPT_CONNECTION: "accept_connection",
  CHANGE_NAME: "change_name",
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  JOIN_GAME: "join_game",
  LEAVE_GAME: "leave_game",
  PING: "ping",
  PONG: "pong",
  SERVER_ERROR: "server_error",
};

export const makeCommand = (commandName, params) => {
  const baseCommand = {
    command: commandName,
    module: MODULE_NAME,
  };
  if (params) {
    return JSON.stringify({
      ...baseCommand,
      ...params,
    });
  }
  return JSON.stringify(baseCommand);
};

