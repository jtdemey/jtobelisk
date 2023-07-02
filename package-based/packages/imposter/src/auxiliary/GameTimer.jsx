import React from 'react';
import PropTypes from 'prop-types';
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

const Time = styled.h5`
	font-size: 1.75rem;
	margin: 0.25rem;
`;

const GameTimer = props => {
	const state = useSelector(state => ({
		remainingTime: state.game.remainingTime,
		theme: state.game.theme
	}));
	const theme = getTheme(state.theme);
	return (
		<Container style={{ borderLeft: props.showBorder
			? `2px solid ${theme.secondary}`
			: 'none'
		}}>
			<Title>{props.title}</Title>
			<Time>{state.remainingTime}</Time>
		</Container>
	);
};

GameTimer.propTypes = {
	showBorder: PropTypes.bool,
	title: PropTypes.string
};

export default GameTimer;