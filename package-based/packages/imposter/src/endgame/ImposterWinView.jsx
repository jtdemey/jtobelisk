import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import GameTimer from '../auxiliary/GameTimer';
import { PHASES } from '../redux/imposterConstants';

const View = styled.div`
	width: 100%;
	height: 100%;
	text-align: center;
	color: #fff;
`;

const Header = styled.h1`
	font-family: 'Oleo Script', cursive;
	font-size: 3rem;
`;

const Text = styled.p`
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1.4rem;
	padding: 0 0.25rem;
`;

const getHeader = isImposter => isImposter ? 'Victory!' : 'Defeat';

const getText = (isImposter, imposterId, phase, players) => {
	if(phase === PHASES.TIME_EXPIRED) {
		const imposterName = players.filter(p => p.socketId === imposterId)[0].name;
		return isImposter
			? 'Well done! They were none the wiser.'
			: `${imposterName} was the Imposter!`;
	}
	return isImposter
		? 'You framed an innocent Actor!'
		: 'You goofed and accused an innocent Actor!';
};

const ImposterWinView = () => {
	const state = useSelector(state => ({
		imposterId: state.game.imposterId,
		phase: state.game.phase,
		players: state.game.players,
		socketId: state.game.socketId
	}));
	const isImposter = state.imposterId === state.socketId;
	return (
		<View>
			<Header>{getHeader(isImposter)}</Header>
			<Text>{getText(isImposter, state.imposterId, state.phase, state.players)}</Text>
			<GameTimer title="Ending in:" />
		</View>
	);
};

export default ImposterWinView;