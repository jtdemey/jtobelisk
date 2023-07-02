import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { MODAL_VIEWS } from '../redux/imposterConstants';
import { hideModal } from '../redux/imposterSlice';
import SettingsModal from './SettingsModal';
import RulesModal from './RulesModal';

const Container = styled(animated.div)`
	display: flex;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	z-index: 2;
`;

const getModal = (modal, hideFunc) => {
	switch(modal) {
		case MODAL_VIEWS.RULES:
			return <RulesModal hideModal={hideFunc} />;
		case MODAL_VIEWS.SETTINGS:
			return <SettingsModal hideModal={hideFunc} />;
		default:
			return null;
	}
};

const ModalArea = props => {
	if(props.modal === MODAL_VIEWS.NONE) return null;
	const dispatch = useDispatch();
	const [spring, api] = useSpring(() => ({ opacity: 0 }));
	React.useEffect(() => api.start({ opacity: 1 }));
	const hideFunc = () => dispatch(hideModal());
	return (
		<Container onClick={hideFunc} style={spring}>
			{getModal(props.modal, hideFunc)}
		</Container>
	);
};

ModalArea.propTypes = {
	modal: PropTypes.number
};

export default ModalArea;