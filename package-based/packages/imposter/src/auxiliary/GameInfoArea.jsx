import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GameCode from '../auxiliary/GameCode';
import GameTimer from '../auxiliary/GameTimer';

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	margin-bottom: 1rem;
`;

const GameInfoArea = props => {
	return (
		<Container>
			<GameCode	/>
			<GameTimer showBorder={true} title={props.timeTitle || 'Time left:'} />
		</Container>
	);
};

GameInfoArea.propTypes = {
	timeTitle: PropTypes.string
};

export default GameInfoArea;