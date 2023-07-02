import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { animated, useSprings } from '@react-spring/web';
import styled from 'styled-components';
import SubmitButton from '../auxiliary/SubmitButton';
import { submitHostGame } from '../redux/imposterSlice';
import BackToMainButton from './BackToMainButton';
import FormInput from './FormInput';
import { getButterySpring } from '../ImposterUtils';

const Header = styled.h2`
  margin: 4rem 0 1rem;
  color: #fff;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1.8rem;
  text-align: center;
`;

const Form = styled(animated.form)`
  display: flex;
  flex-flow: column;
  width: 100%;
`;

const BtnArea = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const handleKeyDown = (e, clickFunc) => {
	if(e.keyCode === 13) {
		e.preventDefault();
		clickFunc();
	}
};

const HostGameForm = () => {
  const [playerName, setPlayerName] = React.useState('');
  const socketId = useSelector(state => state.game.socketId);
  const dispatch = useDispatch();
	const clickFunc = () => dispatch(submitHostGame({ playerName, socketId }));
  const [springs, api] = useSprings(2, i => getButterySpring({ opacity: 0, y: i * 100 + 100 }));
  React.useEffect(() => api.start({ opacity: 1, y: 0 }));
  return (
    <>
      <Header>Host Game</Header>
      <Form onKeyDown={e => handleKeyDown(e, clickFunc)} style={springs[0]}>
        <FormInput
          placeholder="Your name"
          setValue={setPlayerName}
					spring={springs[1]}
          value={playerName}
        />
        <BtnArea>
          <SubmitButton
            clickFunc={clickFunc}
            text="Play"
          />
          <BackToMainButton />
        </BtnArea>
      </Form>
    </>
  );
};

export default HostGameForm;
