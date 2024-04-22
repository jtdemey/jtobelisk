import { nanoid } from "nanoid";
import { COMMANDS, makeCommand } from "./commands.js";
import { makePlayer } from "./player.js";

export const MODULE_NAME = "cardiology";

const MAX_GAMES = 100;
const MAX_PLAYERS = 400;

const logError = (error) =>
  process.stderr.write(`[CARDIOLOGY] ERROR: ${error}\n`);
const logInfo = (info) => process.stdout.write(`[CARDIOLOGY] INFO: ${info}\n`);

const makeGame = (hostPlayerId, games) => {
  let gameId = nanoid(8);
  while (games.some((existingGame) => existingGame?.gameId === gameId)) {
    gameId = nanoid(8);
  }
  return {
    gameId,
    host: hostPlayerId,
    players: [hostPlayerId],
  };
};

const cardiology = {
  clock: undefined,
  games: [],
  players: [],

  addGame: (hostPlayerId) => {
    if (cardiology.games.length >= MAX_GAMES) {
      logError("Maximum games exceeded");
      return;
    }
    cardiology.games.push(makeGame(hostPlayerId, cardiology.games));
  },

  addPlayer: (ws) => {
    if (cardiology.players.length >= MAX_PLAYERS) {
      logError("Maximum players exceeded");
      return;
    }
    cardiology.players.push(makePlayer(ws, cardiology.players));
  },

  getPlayer: (playerId) => {
    const possiblePlayer = cardiology.players.find(playerId);
    if (!possiblePlayer) {
      logError(`No player ${playerId} found`);
      return undefined;
    }
    return possiblePlayer;
  },

  removePlayer: (playerId) => {
    cardiology.players = cardiology.players.filter(
      (player) => player && player.playerId !== playerId,
    );
    cardiology.games.forEach((game) => {
      if (game.players.indexOf(playerId) > -1) {
        game.players = game.players.filter((pId) => pId !== playerId);
      }
    });
  },

  resetPlayerPings: (playerId) => {
    const player = cardiology.getPlayer(playerId);
    if (!player) return;
    console.log(`resetting ${playerId}`);
    player.pings = 0;
  },

  startIdleClock: () => {
    if (cardiology.clock) {
      clearInterval(cardiology.clock);
    }

    cardiology.clock = setInterval(() => {
      const playersToRemove = [];
      cardiology.players.forEach((player) => {
        if (player.pings > 3) {
          playersToRemove.push(player.playerId);
          return;
        }
        player.socket.send(makeCommand(COMMANDS.PING));
        player.pings += 1;
      });

      playersToRemove.forEach((playerId) => {
        cardiology.removePlayer(playerId);
        logInfo(`Removed unresponsive player ${playerId}`);
      });
    }, 3000);
  },

  handleSocketMessage: (ws, raw) => {
    let msg;
    try {
      msg = JSON.parse(raw);
    } catch {
      logError(`Unable to parse client message ${msg}`);
    }

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

    try {
      switch (msg.command) {
        case COMMANDS.CONNECT:
          console.log(msg);
          cardiology.addPlayer(ws, msg);
          break;
        case COMMANDS.DISCONNECT:
          if (!msg.playerId) break;
          cardiology.removePlayer(msg.playerId);
          break;
        case COMMANDS.PONG:
          if (!msg.playerId) break;
          cardiology.resetPlayerPings(msg.playerId);
          break;
        default:
          logError(`Socket command "${msg.command}" not recognized`);
          break;
      }
    } catch (e) {
      logError(
        `Failed to handle command ${msg.command} from player ${msg.playerId}`,
      );
      console.error(e);
      ws.send(makeCommand(COMMANDS.SERVER_ERROR));
    }
  },
};

export default cardiology;
