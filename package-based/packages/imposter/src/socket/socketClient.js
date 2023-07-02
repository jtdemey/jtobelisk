import { IMPOSTER_VIEWS, SOCKET_COMMANDS } from '../redux/imposterConstants';
import { alertMessage, changeGameView, gameTick, initGame, setSocketId, updateVotes } from '../redux/imposterSlice';

export let socket = null;

const initImposter = dispatch => {
  //Socket client
  const socketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URI || 'ws://localhost:3000/';
  socket = new WebSocket(socketUrl);
  let socketId;

  socket.onopen = () => {
		const launchCommand = { command: SOCKET_COMMANDS.LAUNCHED_IMPOSTER };
		//TODO: Handle reconnecting
		/*const storedId = window.localStorage.getItem('JTD_imposterSocketId');
		if(storedId) {
			const lastSeen = parseDateStr(window.localStorage.getItem('JTD_imposterHourLastSeen'));
			console.log(Math.abs(new Date().getTime() - lastSeen.getTime()));
			const validToRejoin = Math.abs(new Date().getTime() - lastSeen.getTime()) < 60000;
			if(validToRejoin) {
				socketId = storedId;
				launchCommand.cachedSocketId = storedId;
				console.log(`Welcome back, ${storedId}`);
			}
		}*/
    console.log(`Socket connection established.`);
    socket.send(JSON.stringify(launchCommand));
  };

  socket.onerror = error => {
    dispatch(alertMessage('Error 69: your browser sucks :(', 5000));
    console.log('Error 69: no websocket support found :(');
    console.error(error);
  };

  socket.onmessage = e => {
    let msg;
    try {
      msg = JSON.parse(e.data);
    } catch(e) {
      console.error('Unable to parse incoming socket message.', e);
    }
    if(msg.command !== 'gameTick') {
      console.debug(`\tGot command "${msg.command}"`);
    }
    switch(msg.command) {
      case SOCKET_COMMANDS.ACCEPT_IMPOSTER_LAUNCH:
				console.log(`Successful handshake with GameSuite - welcome, player ${msg.socketId}.`);
				socketId = msg.socketId;
        dispatch(setSocketId({ socketId: msg.socketId }));
        break;
      case SOCKET_COMMANDS.INIT_GAME:
        dispatch(initGame(msg.gameState));
        break;
      case SOCKET_COMMANDS.PING:
				socket.send(JSON.stringify({ command: 'pong', socketId }));
        break;
      case SOCKET_COMMANDS.GAME_TICK:
        dispatch(gameTick(msg.gameState));
        break;
      case SOCKET_COMMANDS.IMPOSTER_ERROR:
        console.error(msg.text);
        dispatch(alertMessage(msg.text));
				if(msg.returnToMain === true) {
					dispatch(changeGameView(IMPOSTER_VIEWS.MAIN_MENU));
				}
        break;
      case SOCKET_COMMANDS.UPDATE_VOTES:
        dispatch(updateVotes(msg.votes));
        break;
      default:
        console.log(`Unrecognized socket message '${msg.command}'.`);
        break;
    }
  };

  socket.onclose = () => dispatch(alertMessage('Lost connection; try refreshing.', 999999));

  window.onbeforeunload = () => {
    socket.send(JSON.stringify({
      command: SOCKET_COMMANDS.SOCKET_DISONNECT,
      socketId: socketId
    }));
    return null;
  };
};

export default initImposter;
