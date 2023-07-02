import React from 'react';
import { useSelector } from 'react-redux';
import { animated, useSprings } from '@react-spring/web';
import styled from 'styled-components';
import { getButterySpring, getTheme } from '../ImposterUtils';

const Container = styled.div`
	padding: 0.5rem;
`;

const Notification = styled(animated.div)`
	border-radius: 0.5rem;
	color: #fff;
	font-family: 'Source Sans Pro', sans-serif;
	font-size: 1.1rem;
	height: 36px;
	max-width: 80%;
  margin: 0.25rem auto;
  padding-top: 0.3em;
  text-align: center;
	& > p {
		margin: 0;
		padding-top: 0.25rem;
	}
`;

const NotificationArea = () => {
	const state = useSelector(state => ({
		notifications: state.game.notifications,
		theme: state.game.theme
	}));
	const theme = getTheme(state.theme);
	const [springs, api] = useSprings(state.notifications.length,
		() => getButterySpring({ height: '0px' }));
	React.useEffect(() => api.start(() => ({ height: '36px' })));
	return (
		<Container style={{ display: state.notifications.length ? 'block' : 'none' }}>
			{state.notifications.map((notification, i) => (
				<Notification key={i} style={{
					border: `4px solid ${theme.highlight}`,
					...springs[i]
				}}>
					<p>{notification.text}</p>
				</Notification>
			))}
		</Container>
	);
};

export default NotificationArea;