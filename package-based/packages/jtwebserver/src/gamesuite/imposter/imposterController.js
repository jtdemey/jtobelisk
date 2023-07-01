import { nanoid } from 'nanoid';
import { SOCKET_COMMANDS } from '../../../components/imposter/redux/imposterConstants';

export const handleImposterMsg = (wss, ws, msg, recognizedByModule) => {
	let result, playerId;
	switch(msg.command) {
		case SOCKET_COMMANDS.LAUNCHED_IMPOSTER:
			playerId = nanoid();
			wss.gs.addPlayer(wss.gs.makePlayer(ws, playerId), true);
			ws.send(wss.gs.makeCommand(SOCKET_COMMANDS.ACCEPT_IMPOSTER_LAUNCH, {
				socketId: playerId
			}));
			break;
		case SOCKET_COMMANDS.SUBMIT_HOST_GAME:
			result = wss.gs.handleSubmitHostGame(msg);
			if(result) {
				ws.send(wss.gs.makeCommand(SOCKET_COMMANDS.INIT_GAME, { gameState: result }));
			}
			break;
		case SOCKET_COMMANDS.SUBMIT_JOIN_GAME:
			result = wss.gs.handleSubmitJoinGame(msg);
			if(result) {
				ws.send(wss.gs.makeCommand(SOCKET_COMMANDS.INIT_GAME, { gameState: result }));
			}
			break;
		case SOCKET_COMMANDS.EXTEND_TIMER:
			wss.gs.imposter.extendTimer(msg.socketId, msg.gameId);
			break;
		case SOCKET_COMMANDS.HURRY_UP:
			wss.gs.imposter.hurryUp(msg.socketId, msg.gameId);
			break;
		case SOCKET_COMMANDS.TOGGLE_READY_STATE:
			wss.gs.imposter.toggleReadyState(msg);
			break;
		case SOCKET_COMMANDS.ACCUSE_PLAYER:
			wss.gs.imposter.handleAccusePlayer(msg);
			break;
		case SOCKET_COMMANDS.RETURN_TO_LOBBY:
			wss.gs.imposter.handleLobbyReturnVote(msg);
			break;
		case SOCKET_COMMANDS.CAST_VOTE:
			wss.gs.imposter.castVote(msg);
			break;
		case SOCKET_COMMANDS.IDENTIFY_SCENARIO:
			wss.gs.imposter.identifyScenario(msg);
			break;
		default:
			recognizedByModule.imposter = false;
			break;
	}
};