import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import MenuButton from '../auxiliary/MenuButton';
import { returnToLobby, toggleAccusing } from '../redux/imposterSlice';

const Container = styled.div`
	padding: 1rem;
`;

const GameBtns = props => {
	const dispatch = useDispatch();
	return (
		<Container>
			<MenuButton
				clickFunc={() => dispatch(toggleAccusing(props.isAccusing))}
				text={props.isAccusing ? 'Select Imposter' : 'Accuse'}
			/>
			<MenuButton
				clickFunc={() => dispatch((returnToLobby({
					gameId: props.gameId,
					socketId: props.socketId
				})))}
				text="Return to Lobby"
			/>
		</Container>
	);
};

GameBtns.propTypes = {
	gameId: PropTypes.string,
	isAccusing: PropTypes.bool,
	isImposter: PropTypes.bool,
	socketId: PropTypes.string
};

export default GameBtns;
