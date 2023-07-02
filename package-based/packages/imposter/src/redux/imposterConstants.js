export const ENDGAME_REASONS = {
  TIME_RAN_OUT: 0,
  IMPOSTER_ACCUSED: 1,
  IMPOSTER_CORRECT: 2,
  IMPOSTER_WRONG: 3,
  IMPOSTER_QUIT: 4,
	WRONG_ACCUSATION: 5
};

const makeTheme = (title, primary, secondary, highlight) => ({ title, primary, secondary, highlight });
export const IMPOSTER_THEMES = [
	makeTheme('Crystal', '#39141e', '#a62639', '#817EA0'),
	makeTheme('Remnant', '#41413e', '#6F8958', '#C2850A'),
	makeTheme('Seascape', '#1b2c39', '#2d6a68', '#b4ad72'),
	makeTheme('Slate', '#2a3c3c', '#6e7b6d', '#849c8a'),
	makeTheme('Synth', '#3b3c3b', '#468387', '#5BAE8E')
];

export const IMPOSTER_VIEWS = {
	MAIN_MENU: 0,
	HOST_GAME_FORM: 1,
	JOIN_GAME_FORM: 2,
  LOBBY: 3,
  IN_GAME: 4,
  BYSTANDER_VICTORY: 5,
  TIME_EXPIRED: 6,
	WRONG_ACCUSATION: 7,
  LOADING: 8
};

export const NOTIFICATIONS = {
	EXTEND_TIMER_EXCEEDED: 0,
	HURRY_UP_EXCEEDED: 1
};

export const PHASES = {
	LOBBY: 0,
	IN_GAME: 1,
	BYSTANDER_VICTORY: 2,
	TIME_EXPIRED: 3,
	WRONG_ACCUSATION: 4 
};

export const SOCKET_COMMANDS = {
	ACCEPT_IMPOSTER_LAUNCH: 'acceptImposterLaunch',
	ACCUSE_PLAYER: 'accusePlayer',
	CAST_VOTE: 'castVote',
	EXTEND_TIMER: 'extendTimer',
	GAME_TICK: 'gameTick',
	HURRY_UP: 'hurryUp',
	IDENTIFY_SCENARIO: 'identifyScenario',
	IMPOSTER_ERROR: 'imposterError',
	INIT_GAME: 'initGame',
	LAUNCHED_IMPOSTER: 'launchedImposter',
	PING: 'ping',
	PONG: 'pong',
	REFRESH_VOTES: 'refreshVotes',
	RETURN_TO_LOBBY: 'returnToLobby',
	SOCKET_DISONNECT: 'socketDisconnect',
	SUBMIT_HOST_GAME: 'submitHostGame',
	SUBMIT_JOIN_GAME: 'submitJoinGame',
	TOGGLE_READY_STATE: 'toggleReadyState',
	UPDATE_VOTES: 'refreshVotes'
};

export const STORAGE_KEYS = {
	LAST_LAUNCHED: 'JTD_imposter_lastLaunched',
	SOCKET_ID: 'JTD_imposter_socketId',
	THEME: 'JTD_imposter_theme',
};

export const MODAL_VIEWS = {
	NONE:			0,
	RULES: 		1,
	SETTINGS: 2,
	CONFIRM:	3	
};

export const VOTE_TYPES = {
	ACCUSATION: 0,
	RETURN_TO_LOBBY: 1
};