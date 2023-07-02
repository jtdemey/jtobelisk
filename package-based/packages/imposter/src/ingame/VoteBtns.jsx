import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { castVote } from '../redux/imposterSlice';

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
`;

const Timer = styled.div`
	color: #fff;
	font-family: 'Source Sans Pro', sans-serif;
	font-size: 2rem;
`;

const Button = styled.div`
	border-radius: 0.5rem;
	color: #fff;
	font-family: 'Source Sans Pro', sans-serif;
	font-size: 1.1rem;
	margin: 0.25rem auto 0.5rem;
	padding: 0.5rem;
`;

const getClickFunc = (dispatch, props, isYay, isCaller) => isCaller
	? () => false
	: () => dispatch(castVote({
						...props,
						isYay
					}));

const VoteBtns = props => {
	const dispatch = useDispatch();
	const isCaller = props.callerId === props.socketId;
	return (
		<Container>
			<Button
				onClick={getClickFunc(dispatch, props, true, isCaller)}
				style={{
				background: props.theme.secondary
			}}>Yay ({props.yay})</Button>
			<Timer>{props.tick}</Timer>
			<Button
				onClick={getClickFunc(dispatch, props, false, isCaller)}
				style={{
				background: props.theme.highlight
			}}>Nay ({props.nay})</Button>
		</Container>
	);
};

VoteBtns.propTypes = {
	callerId: PropTypes.string,
	gameId: PropTypes.string,
	nay: PropTypes.number,
	socketId: PropTypes.string,
	theme: PropTypes.object,
	tick: PropTypes.number,
	voteId: PropTypes.string,
	voteType: PropTypes.number,
	yay: PropTypes.number
};

export default VoteBtns;