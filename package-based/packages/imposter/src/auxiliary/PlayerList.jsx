import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { animated, useSpring } from '@react-spring/web';
import { accusePlayer } from '../redux/imposterSlice';
import { getRunnySpring, getTheme } from '../ImposterUtils';

const List = styled.ul`
	margin-top: 2rem;
	padding: 0;
`;

const Item = styled(animated.li)`
	width: 14rem;
	height: 2rem;
	border-radius: 4px;	
	color: #fff;
	font-family: 'Source Sans Pro', sans-serif;
	font-size: 1.25rem;
	list-style-type: none;
	line-height: 2rem;
	margin: 4px auto;
	padding: 0.25rem 0;
`;

const getLiStyle = (socketId, playerId, spring, theme) => {
	const res = { background: theme.secondary };
	if(socketId === playerId) {
		return res;
	}
	return {
		...res,
		border: spring.bWidth.to(w => `${w}px solid ${theme.highlight}`)
	};
};

const PlayerList = props => {
	const state = useSelector(state => ({
		gameId: state.game.gameId,
    isReady: state.game.isReady,
    isAccusing: state.game.isAccusing,
    socketId: state.game.socketId,
    theme: state.game.theme
	}));
	const theme = getTheme(state.theme);
	const dispatch = useDispatch();
  const [spring, api] = useSpring(() => getRunnySpring({ bWidth: 0 }));
  React.useEffect(() => api.start({ bWidth: state.isAccusing ? 3 : 0 }));
	return (
		<List>
			{props.players.map(player => (
				<Item
					key={player.socketId}
					onClick={state.isAccusing && player.socketId !== state.socketId
						? () => dispatch(accusePlayer({
								accusedId: player.socketId,
								accuserId: state.socketId,
								gameId: state.gameId
							}))
						: () => false}
					style={getLiStyle(state.socketId, player.socketId, spring, theme)}
				>
					{player.name}
				</Item>
			))}
		</List>
	);
};

PlayerList.propTypes = {
	players: PropTypes.array
};

export default PlayerList;