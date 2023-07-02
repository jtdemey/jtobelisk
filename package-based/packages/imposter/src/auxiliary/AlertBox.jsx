import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { alertMessage } from '../redux/imposterSlice';
import { getTheme } from '../ImposterUtils';

const Box = styled(animated.div)`
	position: fixed;
	bottom: 1rem;
	right: 1rem;
	box-shadow: 4px 4px 3px #111;
	border-radius: 4px;
	font-family: 'Source Sans Pro', sans-serif;
	font-size: 1.1rem;
	color: #fff;
	& > p {
		padding: 0.5rem 1rem;
	}
`;

let alertTimer = null;

const AlertBox = () => {
	const alertText = useSelector(state => state.game.alertText);
	const theme = getTheme(useSelector(state => state.game.theme));
	const dispatch = useDispatch();
	const [spring, api] = useSpring(() => ({
		display: 'none',
		opacity: 0,
		y: 20
	}));
	React.useEffect(() => {
		if(alertTimer) {
			clearInterval(alertTimer);
		}
		if(alertText && alertText !== '') {
			api.start(() => ({ display: 'block', opacity: 1, y: 0 }));
			alertTimer = setTimeout(() => dispatch(alertMessage('')), 5000);
		} else {
			api.start(() => ({ display: 'none', opacity: 0, y: 20 }));
		}
	}, [alertText]);
	return (
		<Box style={{
			...spring,
			background: theme.secondary
		}}>
			<p>{alertText}</p>
		</Box>
	);
};

export default AlertBox;