import React from 'react';
import styled from 'styled-components';

const Prompt = styled.div`
	color: #fff;
	font-family: 'Source Sans Pro', sans-serif;
	font-size: 1.1rem;
	text-align: center;
`;

const PromptLine = styled.div`
	margin: 0.25rem 0;
`;

const ImposterPrompt = () => {
	return (
		<Prompt>
			<PromptLine>You are the Imposter.</PromptLine>
			<PromptLine>Try to deduce the scenario</PromptLine>
			<PromptLine>and blend in until time runs out.</PromptLine>
		</Prompt>
	);
};

export default ImposterPrompt;