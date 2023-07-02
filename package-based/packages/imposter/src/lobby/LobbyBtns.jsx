import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import MenuButton from '../auxiliary/MenuButton';
import { extendTimer, hurryUp } from '../redux/imposterSlice';

const Container = styled.div`
	padding: 0 1rem;
`;

const LobbyBtns = () => {
	const state = useSelector(state => ({
		extendTimerCt: state.game.extendTimerCt,
		gameId: state.game.gameId,
		hurryUpCt: state.game.hurryUpCt,
		socketId: state.game.socketId
	}));
	const dispatch = useDispatch();
	return (
		<Container>
			<MenuButton
				clickFunc={() => dispatch(extendTimer({
					gameId: state.gameId,
					socketId: state.socketId
				}))}
				text={`Extend timer (${state.extendTimerCt})`}
			/>
			<MenuButton
				clickFunc={() => dispatch(hurryUp({
					gameId: state.gameId,
					socketId: state.socketId
				}))}
				text={`Hurry up (${state.hurryUpCt})`}
			/>
		</Container>
	);
};

export default LobbyBtns;