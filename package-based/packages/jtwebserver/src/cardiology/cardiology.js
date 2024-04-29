import { customAlphabet, nanoid } from "nanoid";
import { COMMANDS, makeCommand } from "./commands.js";
import { makePlayer } from "./player.js";

export const MODULE_NAME = "cardiology";

const MAX_GAMES = 100;
const MAX_PLAYERS = 400;

const logError = (error) =>
  process.stderr.write(`[CARDIOLOGY] ERROR: ${error}\n`);
const logInfo = (info) => process.stdout.write(`[CARDIOLOGY] INFO: ${info}\n`);

const makeGameCode = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

const makeGame = (hostPlayerId, games) => {
  let gameId = makeGameCode(4);
  while (games.some((existingGame) => existingGame?.gameId === gameId)) {
    gameId = makeGameCode(4);
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
    const newGame = makeGame(hostPlayerId, cardiology.games);
    cardiology.games.push(newGame);
    return newGame;
  },

  addPlayer: (ws) => {
    if (cardiology.players.length >= MAX_PLAYERS) {
      logError("Maximum players exceeded");
      return;
    }
    const newPlayer = makePlayer(ws, cardiology.players);
    const newGame = cardiology.addGame(newPlayer.playerId);
    cardiology.players.push(newPlayer);
    ws.send(
      makeCommand(COMMANDS.ACCEPT_CONNECTION, {
        gameId: newGame.gameId,
        playerId: newPlayer.playerId,
        playerName: newPlayer.playerName,
      }),
    );
  },

  getPlayer: (playerId) => {
    const possiblePlayer = cardiology.players.find(
      (player) => player.playerId === playerId,
    );
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
    }, 5000);
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
