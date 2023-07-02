import React from 'react';
import styled from 'styled-components';
import MainMenuBtns from './MainMenuBtns';

const View = styled.div`
	width: 100%;
	height: 100%;
	text-align: center;
`;

const MainMenuView = () => {
  return (
    <View>
			<MainMenuBtns />
    </View>
  );
};

export default MainMenuView;