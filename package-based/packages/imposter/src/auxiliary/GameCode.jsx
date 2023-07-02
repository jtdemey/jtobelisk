import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getTheme } from '../ImposterUtils';

const Container = styled.div`
	margin: 0.25rem 0;
	color: #fff;
	font-family: 'Source Sans Pro', sans-serif;
	text-align: center;
`;

const Title = styled.h6`
	font-size: 1rem;
	margin: 0.25rem;
`;

const Code = styled.h5`
	font-size: 1.75rem;
	margin: 0.25rem;
`;

const GameCode = () => {
	const state = useSelector(state => ({
		gameId: state.game.gameId,
		theme: state.game.theme,
	}));
	const theme = getTheme(state.theme);
	return (
		<Container style={{ borderRight: `2px solid ${theme.secondary}` }}>
			<Title>Game Code</Title>
			<Code style={{ color: theme.highlight }}>{state.gameId}</Code>
		</Container>
	);
};

export default GameCode;