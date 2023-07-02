import React from 'react';
import styled, { keyframes } from 'styled-components';
import { getTheme } from '../ImposterUtils';
import { useSelector } from 'react-redux';

const View = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
`;

const speen = keyframes`
	0%, 100% {
		animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
	}
	0% {
		transform: rotateY(0deg);
	}
	50% {
		transform: rotateY(1800deg);
		animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
	}
	100% {
		transform: rotateY(3600deg);
	}
`;

const Wheel = styled.div`
	display: inline-block;
	margin-top: 5rem;
`;

const InnerWheel = styled.div`
	display: inline-block;
	width: 48px;
	height: 48px;
	margin: 8px;
	border-radius: 50%;
	animation: ${speen} 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
`;

const LoadingView = () => {
	const theme = getTheme(useSelector(state => state.game.theme));
  return (
    <View>
			<Wheel>
				<InnerWheel style={{ background: theme.secondary }} />
			</Wheel>
    </View>
  );
};

export default LoadingView;