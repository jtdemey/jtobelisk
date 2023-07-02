import React from 'react';
import styled from 'styled-components';
import { getTheme } from '../ImposterUtils';
import { useDispatch, useSelector } from 'react-redux';
import { changeGameView } from '../redux/imposterSlice';
import { IMPOSTER_VIEWS } from '../redux/imposterConstants';

const Button = styled.div`
	margin: 1.25rem auto 1.25rem 1rem;
	padding: 0.5rem 1rem;
	border-radius: 0.75rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	color: #fff;
	font-family: 'Oleo Script', cursive;
  font-size: 1.4rem;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.8);
`;

const BackToMainButton = () => {
	const dispatch = useDispatch();
	const theme = getTheme(useSelector(state => state.game.theme));
	return (
		<Button onClick={() => dispatch(changeGameView(IMPOSTER_VIEWS.MAIN_MENU))} style={{
			background: theme.highlight
		}}>
		  Cancel	
		</Button>
	);
};

export default BackToMainButton;