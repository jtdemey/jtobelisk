import { nanoid } from "nanoid";

const COMMANDS = {
  ACCEPT_CONNECTION: "accept_connection",
  CONNECT: "connect",
  SERVER_ERROR: "server_error",
};

const MODULE_NAME = "cardiology";

const logError = (error) =>
  process.stderr.write(`[CARDIOLOGY] ERROR: ${error}\n`);
const logInfo = (info) => process.stdout.write(`[CARDIOLOGY] INFO: ${info}\n`);

const makeCommand = (commandName, params) => {
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

const makeGame = (games) => {
  let gameId = nanoid(8);
  while (games.some((existingGame) => existingGame?.gameId === gameId)) {
    gameId = nanoid(8);
  }
  return {
    gameId,
    players: [],
  };
};

const makePlayer = (socket, players) => {
  let playerId = nanoid(12);
  while (
    players.some((existingPlayer) => existingPlayer?.playerId === playerId)
  ) {
    playerId = nanoid(12);
  }
  socket.send(makeCommand(COMMANDS.ACCEPT_CONNECTION, { playerId }));
  players.push({
    playerId,
    socket,
  });
};

const cardiology = {
  games: [],
  players: [],
  addPlayer: (ws) =>
    cardiology.players.push(makePlayer(ws, cardiology.players)),
  removePlayer: (playerId) => {
    cardiology.players = cardiology.players.filter(
      (player) => player && player.playerId !== playerId,
    );
  },
  handleSocketMessage: (ws, raw) => {
    let msg;
    try {
      msg = JSON.parse(raw);
    } catch {
      logError(`Unable to parse client message ${msg}`);
    }

    console.log(msg);
    if (!msg.module || msg.module !== MODULE_NAME) {
      logError(`No valid game title in command ${msg.command}`);
      return;
    }

    if (msg.command !== "ping" && msg.command !== "pong") {
      logInfo(
        `${msg.socketId ? `Socket ${msg.socketId}` : `New player`} says ${
          msg.command
        }`,
      );
    }

    //Core message handler
    try {
      switch (msg.command) {
        case COMMANDS.CONNECT:
          console.log(msg);
          cardiology.addPlayer(ws, msg);
          break;
        default:
          logError(`Socket command "${msg.command}" not recognized`);
          break;
      }
    } catch(e) {
      logError(`Failed to handle command ${msg.command} from player ${msg.playerId}`);
      ws.send(makeCommand(COMMANDS.SERVER_ERROR));
    }
  },
};

export default cardiology;
