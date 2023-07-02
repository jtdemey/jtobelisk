import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { getButterySpring } from '../ImposterUtils';

const Item = styled(animated.div)`
	color: #fff;
	display: flex;
	padding: 0.25rem;
	font-family: 'Source Sans Pro', sans-serif;
	font-size: 1.1rem;
	justify-content: center;
	align-items: center;
`;

const NavItem = props => {
	const [spring, api] = useSpring(() => getButterySpring({
		opacity: 0,
		y: 40
	}));
	React.useEffect(() => api.start({
		delay: props.delay || 0,
		opacity: 1,
		y: 0
	}), [props.visible]);
	return (
		<Item
			onClick={() => props.clickFunc()}
			style={spring}
		>{props.text}</Item>
	);
};

NavItem.propTypes = {
	clickFunc: PropTypes.func,
	delay: PropTypes.number,
	text: PropTypes.string,
	visible: PropTypes.bool
};

export default NavItem;