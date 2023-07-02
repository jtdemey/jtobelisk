import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PlayerList from '../auxiliary/PlayerList';
import GameInfoArea from '../auxiliary/GameInfoArea';
import ImposterPrompt from './ImposterPrompt';
import NotificationArea from '../auxiliary/NotificationArea';
import ScenarioPrompt from './ScenarioPrompt';
import VoteArea from './VoteArea';
import GameBtns from './GameBtns';
import { toggleAccusing } from '../redux/imposterSlice';

const View = styled.div`
	width: 100%;
	height: 100%;
	text-align: center;
`;

const ImposterGameView = () => {
	const dispatch = useDispatch();
	const state = useSelector(state => ({
		gameId: state.game.gameId,
    imposterId: state.game.imposterId,
    socketId: state.game.socketId,
    players: state.game.players,
    isAccusing: state.game.isAccusing
	}));
	const isImposter = state.socketId === state.imposterId;
	return (
		<View onClick={state.isAccusing
			? () => dispatch(toggleAccusing(state.isAccusing))
			: () => false
		}>
			<PlayerList players={state.players} />
			<GameInfoArea />
			<VoteArea />
			<NotificationArea />
			{isImposter
				? <ImposterPrompt />
				: <ScenarioPrompt socketId={state.socketId} />}
			<GameBtns
				gameId={state.gameId}
				isAccusing={state.isAccusing}
				isImposter={isImposter}
				socketId={state.socketId}
			/>
		</View>
	);
};

export default ImposterGameView;