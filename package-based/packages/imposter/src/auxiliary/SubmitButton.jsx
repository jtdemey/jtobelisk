import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getTheme } from '../ImposterUtils';
import { useSelector } from 'react-redux';

const Button = styled.div`
	margin: 1.25rem 1rem 1.25rem auto;
	padding: 0.5rem 1rem;
	border-radius: 0.75rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	color: #fff;
	font-family: 'Oleo Script', cursive;
  font-size: 1.4rem;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.8);
`;

const SubmitButton = props => {
	const theme = getTheme(useSelector(state => state.game.theme));
	return (
		<Button onClick={() => props.clickFunc()} style={{
			background: theme.secondary,
			...props.spring
		}}>
		 {props.text}	
		</Button>
	);
};

SubmitButton.propTypes = {
	clickFunc: PropTypes.func,
	spring: PropTypes.object,
	text: PropTypes.string
};

export default SubmitButton;