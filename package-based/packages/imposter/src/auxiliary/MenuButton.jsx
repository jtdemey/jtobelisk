import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { animated } from '@react-spring/web';
import styled from 'styled-components';
import { getTheme } from '../ImposterUtils';

const Button = styled(animated.div)`
  width: 60%;
  max-width: 320px;
  margin: 0.5rem auto;
  padding: 1rem;
  color: #edf6f9;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1.4rem;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Text = styled.h4`
  width: 100%;
  height: 100%;
  margin: 0;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.8);
`;

const MenuButton = props => {
  const theme = getTheme(useSelector(state => state.game.theme));
  return (
    <Button
      onClick={() => props.clickFunc()}
      style={{
				background: theme.secondary,
				...props.styles,
				...props.spring
			}}
    >
      <Text>{props.text}</Text>
    </Button>
  );
};

MenuButton.propTypes = {
  clickFunc: PropTypes.func,
	spring: PropTypes.object,
	styles: PropTypes.object,
  text: PropTypes.string
};

export default MenuButton;