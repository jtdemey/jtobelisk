import logger from "../logger.js";
import { nanoid } from "nanoid";
import { CORE_SOCKET_COMMANDS } from "./socketCommands.js";
import { handlePong, pingPlayers } from "./playerCleaner.js";
import createImposterModule from "./gamemodules/imposterModule.js";

export const makeGameSuite = () => {
  const gameSuite = {};

  /* GameModule: {
   *   controller: (wss, ws, msg, recognizedByModule) => void;
   *   domain: {
   *     handleSubmitHostGame?: (msg: { socketId: string, playerName?: string }, currentGame: Game, currentPlayer: Player) => void;
   *     handleSubmitJoinGame?: (msg: { socketId: string, playerName?: string }, currentGame: Game, currentPlayer: Player) => void;
   *     initialRemainingTime?: number;
   *     iteratePhase: (game: Game) => void;
   *     removePlayer: (socketId: string, activeGame: Game) => void;
   *   }
   *
   *  Todo: Move everything custom to domains
   */

  //Fields
  gameSuite.isIdle = false;
  gameSuite.clock = null;
  gameSuite.gameList = [];
  gameSuite.playerList = [];
  gameSuite.gameModules = {
    imposter: createImposterModule(gameSuite),
  };

  //Private
  let gsTick = 0;

  //Logs
  const getLogText = (txt, gameId) =>
    `[GS] ${gameId ? `[${gameId}] ` : ""}${txt}`;

  gameSuite.logDebug = (err, gameId = null) =>
    logger.debug(getLogText(err, gameId));

  gameSuite.logInfo = (msg, gameId = null) =>
    logger.info(`[GS] ${gameId ? `[${gameId}] ` : ""}${msg}`);

  gameSuite.logError = (err, gameId = null) =>
    logger.error(`[GS] ${gameId ? `[${gameId}] ` : ""}${err}`);

  //Creators
  gameSuite.makeCommand = (commName, params = null) => {
    if (params) {
      return JSON.stringify({
        command: commName,
        ...params,
      });
    }
    return JSON.stringify({
      command: commName,
    });
  };

  const genGameId = () => {
    const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let id = "";
    for (let i = 0; i < 4; i++) {
      const cInd = Math.floor(Math.random() * abc.length);
      const c = abc.charAt(cInd);
      id += c;
    }
    return id;
  };

  gameSuite.makeGame = (moduleName) => {
    const currentModule = gameSuite.getGameModule(moduleName);
    return {
      gameId: genGameId(),
      gameTitle: moduleName,
      host: null,
      isPaused: false,
      players: [],
      phase: 0,
      remainingTime: currentModule.initialRemainingTime || 45,
      tick: 0,
      ...currentModule.makeGame(),
    };
  };

  gameSuite.makePlayer = (socket) => ({
    extendTimerCt: 0,
    gameId: null,
    hurryUpCt: 0,
    isDisconnected: false,
    isPlaying: false,
    isReady: false,
    name: null,
    socket: socket,
    socketId: nanoid(),
  });

  gameSuite.makeVote = (
    type,
    callerId,
    callerName,
    threshold,
    voteData = {}
  ) => ({
    voteId: nanoid(),
    voteType: type,
    voters: [],
    callerId: callerId,
    callerName,
    tick: 20,
    threshold,
    yay: 0,
    nay: 0,
    ...voteData,
  });

  //Utilities
  gameSuite.emitToGame = (gameId, command, debug = false) => {
    const gamePlayers = gameSuite.playerList.filter(
      (p) => p.gameId && p.gameId === gameId
    );
    for (let j = 0; j < gamePlayers.length; j++) {
      if (debug) {
        gameSuite.logInfo(
          `Sending ${JSON.parse(command).command} to ${gamePlayers[j].socketId}`
        );
      }
      gamePlayers[j].socket.send(command);
    }
  };

  gameSuite.emitToPlayer = (socketId, command, debug = false) => {
    const player = gameSuite.playerList.filter(
      (p) => p.socketId === socketId
    )[0];
    if (!player) {
      gameSuite.logError(`Could not emit to player ${socketId}`);
    }
    if (debug) {
      gameSuite.logInfo(
        `Sending ${JSON.parse(command).command} to ${socketId}`
      );
    }
    player.socket.send(command);
  };

  gameSuite.parseRes = (msg) => {
    try {
      const r = JSON.parse(msg);
      return r;
    } catch {
      gameSuite.logError(`Unable to parse client message ${msg}`);
    }
  };

  //Getters
  gameSuite.getGame = (gameId) => {
    const r = gameSuite.gameList.filter((g) => g.gameId === gameId)[0];
    if (!r) {
      gameSuite.logError(`Could not get game ${gameId}`);
      return false;
    }
    return r;
  };

  gameSuite.getGameModule = (moduleName) => {
    const m = gameSuite.gameModules[moduleName];
    if (!m) {
      gameSuite.logError(`Could not get game module ${moduleName}`);
      return false;
    }
    return m;
  };

  gameSuite.getPlayer = (socketId) => {
    const r = gameSuite.playerList.filter((p) => p.socketId === socketId)[0];
    if (!r) {
      gameSuite.logError(`Could not get player ${socketId}`);
      return false;
    }
    return r;
  };

  //Setters
  gameSuite.updateGame = (gameId, gameData) => {
    let g = gameSuite.getGame(gameId.toUpperCase());
    if (!g) {
      gameSuite.logError(`Could not update game ${gameId}`);
    }
    g = {
      ...g,
      ...gameData,
    };
    const f = gameSuite.gameList.filter((g) => g.gameId !== gameId);
    gameSuite.gameList = f.concat([g]);
    return g;
  };

  gameSuite.updatePlayer = (socketId, playerData) => {
    let p = gameSuite.getPlayer(socketId);
    if (!p) {
      gameSuite.logError(`Could not update player ${socketId}`);
    }
    p = {
      ...p,
      ...playerData,
    };
    const f = gameSuite.playerList.filter((p) => p.socketId !== socketId);
    gameSuite.playerList = f.concat([p]);
    return p;
  };

  //Adders
  gameSuite.addGame = (game, debug = false) => {
    gameSuite.gameList = gameSuite.gameList.concat([game]);
    if (debug) {
      gameSuite.logInfo(
        `Added game ${game.gameId} (Total: ${gameSuite.gameList.length})`
      );
    }
  };

  gameSuite.addPlayer = (player, debug = false) => {
    gameSuite.playerList = gameSuite.playerList.concat([player]);
    if (debug) {
      gameSuite.logInfo(
        `Added player ${player.socketId} (Total: ${gameSuite.playerList.length})`
      );
    }
  };

  //Deleters
  gameSuite.removeGame = (gameId, debug = false) => {
    const r = gameSuite.gameList.filter((g) => g.gameId !== gameId);
    gameSuite.gameList = r;
    if (debug) {
      gameSuite.logInfo(
        `Removed game ${gameId} (Total: ${gameSuite.gameList.length})`
      );
    }
  };

  gameSuite.removePlayer = (socketId, debug = false) => {
    const activeGame = gameSuite.gameList.filter((g) =>
      g.players.some((p) => p.socketId === socketId)
    )[0];
    if (activeGame && activeGame.players) {
      if (activeGame.players.length <= 1) {
        gameSuite.removeGame(activeGame.gameId);
        gameSuite.logInfo(
          `Removed empty game ${activeGame.gameId} (Total: ${gameSuite.gameList.length})`
        );
      } else {
        gameSuite.updateGame(activeGame.gameId, {
          players: activeGame.players.filter((p) => p.socketId !== socketId),
        });
      }
    }
    const currentModule = gameSuite.getGameModule(activeGame.gameTitle);
    if (currentModule.removePlayer) {
      currentModule.removePlayer(socketId, activeGame);
    }
    gameSuite.playerList = gameSuite.playerList.filter(
      (p) => p.socketId !== socketId
    );
    if (debug) {
      gameSuite.logInfo(
        `Removed player ${socketId} (Total: ${gameSuite.playerList.length})`
      );
    }
  };

  //Lifecycle
  gameSuite.doGameTick = (game) => {
    let g = {
      ...game,
    };
    g.tick += 1;
    g.remainingTime -= 1;
    if (g.remainingTime < 0) {
      g = gameSuite.iteratePhase(g);
    }
    if (g.votes && g.votes.length > 0) {
      g.votes = g.votes
        .map((v) => ({ ...v, tick: v.tick - 1 }))
        .filter((v) => v.tick > 0);
    }
    return g;
  };

  gameSuite.iteratePhase = (game) => {
    let g = { ...game };
    if (g.votes) {
      g.votes = [];
    }
    for (let i = 0; i < g.players.length; i++) {
      game.players[i].isReady = false;
    }
    const currentModule = gameSuite.getGameModule(g.gameTitle);
    currentModule.iteratePhase(g);
    return g;
  };

  const onTick = (tick) => {
    if (tick % 15 === 0) {
      pingPlayers(gameSuite);
    }
    if (tick > Number.MAX_SAFE_INTEGER) {
      tick = 0;
    }
    tick++;
    return tick;
  };

  gameSuite.startGameClock = () => {
    gameSuite.clock = setInterval(() => {
      if (gameSuite.gameList.length < 1) {
        gameSuite.logInfo("Going idle...");
        gameSuite.startIdleClock(gameSuite);
      }
      const activeGames = gameSuite.gameList.filter(
        (g) => g.isPaused === false && g.players.length > 0
      );
      for (let i = 0; i < activeGames.length; i++) {
        let g = activeGames[i];
        g = gameSuite.doGameTick(g);
        gameSuite.updateGame(g.gameId, { ...g });
        gameSuite.emitToGame(
          g.gameId,
          gameSuite.makeCommand(CORE_SOCKET_COMMANDS.GAME_TICK, {
            gameState: g,
          })
        );
      }
      gsTick = onTick(gsTick);
    }, 1000);
  };

  gameSuite.startIdleClock = () => {
    clearInterval(gameSuite.clock);
    gameSuite.clock = setInterval(() => {
      if (gameSuite.gameList.length > 0) {
        gameSuite.logInfo(`Bootin' up!`);
        clearInterval(gameSuite.clock);
        gameSuite.startGameClock(gameSuite);
      }
      gsTick = onTick(gsTick);
    }, 3000);
  };

  const truncateName = (raw) => (raw.length > 24 ? raw.substring(0, 24) : raw);

  //Form Handlers
  gameSuite.handleSubmitHostGame = (msg) => {
    const newGame = gameSuite.makeGame(msg.gameTitle);
    const hostPlayer = gameSuite.updatePlayer(msg.socketId, {
      gameId: newGame.gameId,
      name: truncateName(msg.playerName) || "Dingus",
    });
    newGame.host = hostPlayer.socketId;
    newGame.players = newGame.players.concat([hostPlayer]);
    gameSuite.addGame(newGame, true);
    const currentModule = gameSuite.getGameModule(msg.gameTitle);
    if (currentModule.handleSubmitHostGame) {
      currentModule.handleSubmitHostGame(msg, newGame, hostPlayer);
    }
    gameSuite.logInfo(`Host game submitted by ${msg.socketId}`);
    return newGame;
  };

  const getOriginalName = (name, players) => {
    if (players.some((p) => p.name === name)) {
      const lastChar = name.charAt(name.length - 1);
      let newName;
      if (isNaN(lastChar)) {
        newName = name + " 2";
      } else {
        newName = name.replace(/.$/, (parseInt(lastChar) + 1).toString());
      }
      return getOriginalName(newName, players);
    } else {
      return name;
    }
  };

  gameSuite.handleSubmitJoinGame = (msg) => {
    const targetGame = gameSuite.getGame(msg.gameId.toUpperCase());
    let rawName = truncateName(msg.playerName) || "Dingus";
    const playerName = getOriginalName(rawName.trim(), targetGame.players);
    const joiner = gameSuite.updatePlayer(msg.socketId, {
      gameId: msg.gameId.toUpperCase(),
      name: playerName,
    });
    const newPlayers = targetGame.players.concat([joiner]);
    gameSuite.updateGame(msg.gameId, {
      players: newPlayers,
    });
    const currentModule = gameSuite.getGameModule(msg.gameTitle);
    if (currentModule.handleSubmitJoinGame) {
      currentModule.handleSubmitJoinGame(msg, targetGame, joiner);
    }
    gameSuite.logInfo(`Join game submitted by ${msg.socketId}`);
    return {
      ...targetGame,
      players: newPlayers,
    };
  };

  //Message handler
  gameSuite.handleSocketMsg = (wss, ws, raw) => {
    const msg = wss.gs.parseRes(raw);
    console.log(msg);
    if (msg.command !== "ping" && msg.command !== "pong") {
      gameSuite.logInfo(
        `${msg.socketId ? `Socket ${msg.socketId}` : `New player`} says ${
          msg.command
        }`
      );
    }
    let recognizedByModule = ["core", ...Object.keys(gameSuite.gameModules)];
    //Core handler
    switch (msg.command) {
      case CORE_SOCKET_COMMANDS.PONG:
        handlePong(msg.socketId);
        break;
      case CORE_SOCKET_COMMANDS.SOCKET_DISONNECT:
        wss.gs.removePlayer(msg.socketId, true);
        break;
      default:
        recognizedByModule = recognizedByModule.filter((x) => x !== "core");
        break;
    }
    const currentPlayer = gameSuite.getPlayer(msg.socketId);
    const currentGame = gameSuite.getGame(currentPlayer.gameId);
    const currentModule = gameSuite.getGameModule(currentGame.gameTitle);
    console.log(currentModule);
    currentModule.controller(wss, ws, msg, recognizedByModule);
    if (recognizedByModule.length < 1) {
      gameSuite.logError(`Socket command '${msg.command}' not recognized.`);
    }
  };

  const verifyModules = () => {
    const propsToCheck = [
      "iteratePhase",
      "removePlayer",
    ];
    Object.keys(gameSuite.gameModules).forEach((moduleName) => {
      let checksOut = true;
      const currentModule = gameSuite.gameModules[moduleName];
      propsToCheck.forEach((prop) => {
        if (!currentModule.domain[prop]) {
          checksOut = false;
          gameSuite.logError(
            `Expected property ${prop} in game module ${moduleName}'s domain`
          );
        }
      });
      if (checksOut) {
        gameSuite.logInfo(`Loaded module '${moduleName}'`);
      }
    });
  };
  verifyModules();

  return gameSuite;
};
