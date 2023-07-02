import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { getButterySpring, getTheme } from '../ImposterUtils';
import ModalCloseButton from './ModalCloseButton';

const Body = styled(animated.div)`
	width: 80%;
	height: 80%;
	margin: auto;
	background: #edf2f4;
	border-radius: 0.5rem;
	font-family: 'Source Sans Pro', sans-serif;
	font-size: 1.1rem;
	overflow-y: scroll;
`;

const TextContainer = styled.article`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	text-align: left; 
	> p {
		margin: 0 1rem;
	}
`;

const RulesHeader = styled.h4`
	margin: 0 auto 0.5rem;
	padding-bottom: 12px;
	font-size: 1.5rem;
	text-align: center;
`;

const nullListener = e => e.stopPropagation();

const RulesModal = props => {
	const theme = getTheme(useSelector(state => state.game.theme));
	const dark = { color: theme.secondary };
	const light = { color: theme.highlight };
	const [spring, api] = useSpring(() => getButterySpring({ y: 300 }));
	React.useEffect(() => api.start({ y: 0 }));
	return (
		<Body onClick={e => nullListener(e)} style={spring}>
			<ModalCloseButton hideModal={props.hideModal} />
			<TextContainer className="rules-content-area">
        <RulesHeader>How to Play</RulesHeader>
        <p>Imposter is a game about acting and subtlety that works best with 4-8 players.</p><br />
        <p>Each round, a random <span style={dark}>scenario</span>&nbsp;and <span style={light}>condition</span> are provided.</p><br />
				<p>One player is randomly chosen to be the <span style={dark}>Imposter</span> while 
					the rest are <span style={light}>Actors</span>.</p><br />
        <p>If you&apos;re an <span style={light}>Actor</span>, the scenario and condition will 
          be shown on your screen. Your goal as an Actor is to determine who the <span style={dark}>Imposter</span> is.</p><br />
        <p>To win, the <span style={light}>Actors</span> must unanimously agree
          on who the Imposter is. If you think you know who the Imposter 
          is, <span style={dark}>vote to accuse</span> them.</p><br />
        <p>If you&apos;re the <span style={dark}>Imposter</span>, you won't know 
					the <span style={dark}>scenario</span> nor the <span style={light}>condition</span>,
					so you'll have to blend in until time runs outs.</p><br />
        <p>The objective for the <span style={dark}>Imposter</span> is to appear as though
          you are an <span style={light}>Actor</span>, using contextual clues to answer questions satisfactorily enough so as to not arouse suspicion.</p><br />
        <p>The gameplay itself is simple: the player designated as <span style={light}>(first)</span> asks 
          any other player a question. The player who answers asks another player a question, and so on.</p><br />
        <p>The game ends when either all players except one agree on who the&nbsp;
          <span style={dark}>Imposter</span> is or time runs out. If time runs out, the&nbsp;
          <span style={dark}>Imposter</span> wins. If the <span style={light}>Actors</span> correctly agree on 
          who the <span style={dark}>Imposter</span> is, the <span style={light}>Actors</span> win. However, if 
          the majority of the <span style={light}>Actors</span> vote to accuse another <span style={light}>Actor</span>, the&nbsp;
          <span style={dark}>Imposter</span> wins.</p><br />
      </TextContainer>
		</Body>
	);
};

RulesModal.propTypes = {
	hideModal: PropTypes.func
};

export default RulesModal;