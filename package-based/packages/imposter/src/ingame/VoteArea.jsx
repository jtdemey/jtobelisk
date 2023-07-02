import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getTheme } from '../ImposterUtils';
import { VOTE_TYPES } from '../redux/imposterConstants';
import VoteBtns from './VoteBtns';

const Container = styled.div`
	padding: 0.5rem 0 1rem;
`;

const VoteBox = styled.div`
	border-radius: 0.5rem;
	color: #fff;
	font-family: 'Source Sans Pro', sans-serif;
	font-size: 1.1rem;
	max-width: 80%;
  margin: 0 auto 0.25rem;
  text-align: center;
	& > p {
		margin: 0;
		padding: 0.25rem;
	}
`;

const getVoteText = vote => {
	if(vote.voteType === VOTE_TYPES.ACCUSATION) {
		return `${vote.callerName} accuses ${vote.accusedName} as the Imposter!`;
	}
	return `${vote.callerName} wants to return to the lobby.`;
};

const VoteArea = () => {
	const state = useSelector(state => ({
		gameId: state.game.gameId,
		socketId: state.game.socketId,
		theme: state.game.theme,
		votes: state.game.votes
	}));
	const theme = getTheme(state.theme);
	return (
		<Container style={{ display: state.votes.length ? 'block' : 'none' }}>
			{state.votes.map(vote => (
				<VoteBox key={vote.voteId} style={{
					border: `4px solid ${theme.highlight}`
				}}>
					<p>{getVoteText(vote)}</p>
					<p>Yays needed: {vote.threshold}</p>
					<VoteBtns
						callerId={vote.callerId}
						gameId={state.gameId}
						nay={vote.nay}
						socketId={state.socketId}
						theme={theme}
						tick={vote.tick}
						voteId={vote.voteId}
						voteType={vote.voteType}
						yay={vote.yay}
					/>
				</VoteBox>
			))}
		</Container>
	);
};

export default VoteArea;