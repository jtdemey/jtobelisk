import { nanoid } from "nanoid";
import { COMMANDS, makeCommand } from "./commands.js";

export const makePlayer = (socket, players) => {
  let playerId = nanoid(16);
  while (
    players.some((existingPlayer) => existingPlayer?.playerId === playerId)
  ) {
    playerId = nanoid(16);
  }
  socket.send(makeCommand(COMMANDS.ACCEPT_CONNECTION, { playerId }));
  return {
    pings: 0,
    playerId,
    socket,
  };
};

