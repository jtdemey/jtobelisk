import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PlayerList from '../auxiliary/PlayerList';
import GameInfoArea from '../auxiliary/GameInfoArea';
import NotificationArea from '../auxiliary/NotificationArea';
import LobbyBtns from './LobbyBtns';

const View = styled.div`
	width: 100%;
	height: 100%;
	text-align: center;
`;

const LobbyView = () => {
	const players = useSelector(state => state.game.players);
	return (
		<View>
			<PlayerList players={players} />
			<GameInfoArea timeTitle="Starting in:" />
			<NotificationArea />
			<LobbyBtns />
		</View>
	);
};

export default LobbyView;