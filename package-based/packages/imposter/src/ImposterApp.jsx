import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ImposterViewRouter from './auxiliary/ImposterViewRouter';
import ModalArea from './modal/ModalArea';
import { getTheme } from './ImposterUtils';
import ImposterHeader from './auxiliary/ImposterHeader';
import { STORAGE_KEYS } from './redux/imposterConstants';
import { setTheme } from './redux/imposterSlice';
import AlertBox from './auxiliary/AlertBox';

const App = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 101%;
  height: 100%;
	margin: 0;
	padding: 0;
	overflow-x: hidden;
  overflow-y: scroll;
		
	::-webkit-scrollbar {
		width: 0.25rem;
	}

	::-webkit-scrollbar-track {
		display: none;
		background: #777;
	}

	::-webkit-scrollbar-thumb {
		background: #444;
		border-radius: 4px;
	}

	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
`;

const ImposterApp = props => {
	const modal = useSelector(state => state.game.modal);
	const theme = getTheme(useSelector(state => state.game.theme));
	const dispatch = useDispatch();
	React.useEffect(() => {
		const storedTheme = window.localStorage.getItem(STORAGE_KEYS.THEME);
		if(storedTheme) {
			dispatch(setTheme(storedTheme));
		}
		props.initImposter(dispatch);
	}, []);
  return (
		<App style={{ background: theme.primary }}>
			<ModalArea modal={modal} />
			<AlertBox />
			<ImposterHeader />
			<ImposterViewRouter />
		</App>
	);
};

ImposterApp.propTypes = {
	initImposter: PropTypes.func
};

export default ImposterApp;
