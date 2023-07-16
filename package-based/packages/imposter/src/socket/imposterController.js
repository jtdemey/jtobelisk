import { SOCKET_COMMANDS } from "../redux/imposterConstants.js";

export const handleImposterMsg = (wss, ws, msg, recognizedByModule) => {
  let result, playerId;
  const gameModule = wss.gs.getGameModule("imposter");
  if (!gameModule) {
    console.error("Couldn't resolve imposter game module");
    return;
  }
  const domain = gameModule.domain;
  switch (msg.command) {
    case SOCKET_COMMANDS.LAUNCH_GAME:
      const player = wss.gs.makePlayer(ws);
      playerId = player.socketId;
      wss.gs.addPlayer(player, true);
      ws.send(
        wss.gs.makeCommand(SOCKET_COMMANDS.ACCEPT_GAME_LAUNCH, {
          socketId: playerId,
        })
      );
      break;
    case SOCKET_COMMANDS.SUBMIT_HOST_GAME:
      result = wss.gs.handleSubmitHostGame(msg);
      if (result) {
        ws.send(
          wss.gs.makeCommand(SOCKET_COMMANDS.INIT_GAME, { gameState: result })
        );
      }
      break;
    case SOCKET_COMMANDS.SUBMIT_JOIN_GAME:
      result = wss.gs.handleSubmitJoinGame(msg);
      if (result) {
        ws.send(
          wss.gs.makeCommand(SOCKET_COMMANDS.INIT_GAME, { gameState: result })
        );
      }
      break;
    case SOCKET_COMMANDS.EXTEND_TIMER:
      domain.extendTimer(msg.socketId, msg.gameId);
      break;
    case SOCKET_COMMANDS.HURRY_UP:
      domain.hurryUp(msg.socketId, msg.gameId);
      break;
    case SOCKET_COMMANDS.TOGGLE_READY_STATE:
      domain.toggleReadyState(msg);
      break;
    case SOCKET_COMMANDS.ACCUSE_PLAYER:
      domain.handleAccusePlayer(msg);
      break;
    case SOCKET_COMMANDS.RETURN_TO_LOBBY:
      domain.handleLobbyReturnVote(msg);
      break;
    case SOCKET_COMMANDS.CAST_VOTE:
      domain.castVote(msg);
      break;
    case SOCKET_COMMANDS.IDENTIFY_SCENARIO:
      domain.identifyScenario(msg);
      break;
    default:
      recognizedByModule.imposter = false;
      break;
  }
};
