import { createSlice } from '@reduxjs/toolkit';
import { IMPOSTER_VIEWS, MODAL_VIEWS, NOTIFICATIONS, SOCKET_COMMANDS, STORAGE_KEYS } from './imposterConstants';
import { socket } from '../socket/socketClient';

export const imposterSlice = createSlice({
  name: 'game',
  initialState: {
		//Game
    condition: null,
    gameId: null,
    host: null,
    imposterId: null,
		notifications: [],
    phase: 0,
    players: [],
    remainingTime: 60,
    roles: [],
    scenario: null,
    tick: 0,
    votes: [],
		//Client
		alertText: null,
		isAccusing: false,
		modal: MODAL_VIEWS.NONE,
		extendTimerCt: 3,
		hurryUpCt: 6,
		playerName: 'Marv',
		isReady: false,
    socketId: null,
    socket: null,
		theme: 4,
    lastSocketCommand: null,
		view: IMPOSTER_VIEWS.MAIN_MENU
  },
  reducers: {
		accusePlayer: (state, action) => {
			const command = SOCKET_COMMANDS.ACCUSE_PLAYER;
			socket.send(JSON.stringify({
				command,
				...action.payload
			}));
			state.lastSocketCommand = command;
		},
		alertMessage: (state, action) => {
			state.alertText = action.payload;
		},
		appendNotification: (state, action) => {
			state.notifications = state.notifications.concat([action.payload]);
		},
		assignScenario: (state, action) => {
			state.condition = action.payload.condition;
			state.imposterId = action.payload.imposterId;
			state.roles = action.payload.roles;
			state.scenario = action.payload.scenario;
			state.scenarioList = action.payload.scenarioList;
		},
		castVote: (state, action) => {
			const command = SOCKET_COMMANDS.CAST_VOTE;
			socket.send(JSON.stringify({
				command,
				...action.payload
			}));
			state.lastSocketCommand = command;
		},
		changeGameView: (state, action) => {
			state.view = action.payload;
		},
		clearTempPhaseData: state => {
			state.extendTimerCt = 3;
			state.hurryUpCt = 6;
			state.isAccusing = false;
			state.isReady = false;
			state.notifications = [];
			state.votes = [];
		},
		emitSocketMsg: (state, action) => {
			socket.send(JSON.stringify(action.payload));
			state.lastSocketCommand = action.payload.command;
		},
		extendTimer: (state, action) => {
			if(state.extendTimerCt > 0) {
				state.extendTimerCt -= 1;
				state.remainingTime += 10;
				const command = SOCKET_COMMANDS.EXTEND_TIMER;
				socket.send(JSON.stringify({
					command,
					...action.payload
				}));
				state.lastSocketCommand = command;
			} else {
				if(!state.notifications.some(
					n => n.type === NOTIFICATIONS.EXTEND_TIMER_EXCEEDED
				)) {
					state.notifications = state.notifications.concat([{
						text: 'Yer killin me, Smalls.',
						type: NOTIFICATIONS.EXTEND_TIMER_EXCEEDED
					}]);
				}
			}
		},
		gameTick: () => {},
		hideModal: state => {
			state.modal = MODAL_VIEWS.NONE;
		},
		hurryUp: (state, action) => {
			if(state.hurryUpCt > 0) {
				state.hurryUpCt -= 1;
				state.remainingTime -= 1;
				const command = SOCKET_COMMANDS.HURRY_UP;
				socket.send(JSON.stringify({
					command,
					...action.payload
				}));
				state.lastSocketCommand = command;
			} else {
				if(!state.notifications.some(
					n => n.type === NOTIFICATIONS.HURRY_UP_EXCEEDED
				)) {
					state.notifications = state.notifications.concat([{
						text: 'Slow your rolls, sweaty.',
						type: NOTIFICATIONS.HURRY_UP_EXCEEDED
					}]);
				}
			}
		},
		initGame: (state, action) => {
			const gs = action.payload;
			state.gameId = gs.gameId;
			state.phase = gs.phase;
			state.players = gs.players;
			state.remainingTime = gs.remainingTime;
			state.tick = gs.tick;
			state.votes = gs.votes;
			state.view = IMPOSTER_VIEWS.LOBBY;
			state.extendTimerCt = 3;
			state.hurryUpCt = 6;
		},
		returnToLobby: (state, action) => {
			const command = SOCKET_COMMANDS.RETURN_TO_LOBBY;
			socket.send(JSON.stringify({
				command,
				...action.payload
			}));
			state.lastSocketCommand = command;
		},
		setSocketId: (state, action) => {
			window.localStorage.setItem(STORAGE_KEYS.SOCKET_ID, action.payload.socketId);
			window.localStorage.setItem(STORAGE_KEYS.LAST_LAUNCHED, new Date().toISOString());
			state.socketId = action.payload.socketId;
		},
		setTheme: (state, action) => {
			window.localStorage.setItem(STORAGE_KEYS.THEME, action.payload);
			state.theme = action.payload;
		},
		showModal: (state, action) => {
			state.modal = action.payload;
		},
		submitHostGame: (state, action) => {
			state.playerName = action.payload.playerName;
		},
		submitJoinGame: (state, action) => {
			state.playerName = action.payload.playerName;
		},
		syncGameState: (state, action) => {
			const gs = action.payload;
			state.gameId = gs.gameId;
			state.phase = gs.phase;
			state.players = gs.players;
			state.remainingTime = gs.remainingTime;
			state.tick = gs.tick;
			state.votes = gs.votes;
		},
		toggleAccusing: (state, action) => {
			state.isAccusing = !action.payload;
		},
		updatePlayers: (state, action) => {
			state.players = action.payload;
		},
		updateVotes: (state, action) => {
			state.votes = action.payload;
		}
  },
  extraReducers: {}
});

export const {
	accusePlayer, alertMessage, appendNotification,
	assignScenario, castVote, changeGameView,
	clearTempPhaseData, emitSocketMsg, extendTimer,
	gameTick, hideModal, hurryUp, initGame,
	returnToLobby, setSocketId, setTheme, showModal,
	submitHostGame, submitJoinGame, syncGameState,
	toggleAccusing, updatePlayers, updateVotes
} = imposterSlice.actions;

export default imposterSlice.reducer;