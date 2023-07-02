import React from 'react';
import { useDispatch } from 'react-redux';
import { useSprings } from '@react-spring/web';
import styled from 'styled-components';
import MenuButton from '../auxiliary/MenuButton';
import { getButterySpring } from '../ImposterUtils';
import { IMPOSTER_VIEWS, MODAL_VIEWS } from '../redux/imposterConstants';
import { changeGameView, showModal } from '../redux/imposterSlice';

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
  padding-top: 1rem;
`;

const MainMenuBtns = () => {
  const dispatch = useDispatch();
	const [springs, api] = useSprings(4, () => getButterySpring({
		y: 700 
	}));
	React.useEffect(() => api.start(i => ({ y: 0, delay: i * 100 })));
  return (
    <Container>
      <MenuButton
        clickFunc={() => dispatch(changeGameView(IMPOSTER_VIEWS.HOST_GAME_FORM))}
				spring={springs[0]}
        text="Host Game"
      ></MenuButton>
      <MenuButton
        clickFunc={() => dispatch(changeGameView(IMPOSTER_VIEWS.JOIN_GAME_FORM))}
				spring={springs[1]}
        text="Join Game"
      ></MenuButton>
      <MenuButton
        clickFunc={() => dispatch(showModal(MODAL_VIEWS.SETTINGS))}
				spring={springs[2]}
        text="Settings"
      ></MenuButton>
      <MenuButton
        clickFunc={() => dispatch(showModal(MODAL_VIEWS.RULES))}
				spring={springs[3]}
        text="How to Play"
      ></MenuButton>
    </Container>
  );
};

export default MainMenuBtns;