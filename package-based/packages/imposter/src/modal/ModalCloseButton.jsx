import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { hideModal } from '../redux/imposterSlice';

const Container = styled.div`
	display: flex;
	text-align: right;
	width: 100%;
`;

const Button = styled.span`
	width: 1.5rem;
	color: #111;
	font-family: 'Source Sans Pro', sans-serif;
	font-size: 1.5rem;
	margin-left: auto;
	margin-right: 0;
	padding: 0.5rem 1rem;
`;

const ModalCloseButton = props => {
	return (
		<Container>
			<Button onClick={() => props.hideModal()}>X</Button>
		</Container>
	);
};

ModalCloseButton.propTypes = {
	hideModal: PropTypes.func
};

export default ModalCloseButton;