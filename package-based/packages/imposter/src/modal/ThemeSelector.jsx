import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { IMPOSTER_THEMES } from '../redux/imposterConstants';
import { setTheme } from '../redux/imposterSlice';

const Header = styled.h5`
  width: 100%;
  margin: 1rem 1rem;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1.5rem;
`;

const List = styled.ul`
  width: 100%;
	padding: 0;
  list-style-type: none;
`;

const Button = styled.li`
  width: 12rem;
	margin: 0 auto 0.3rem;
  padding: 0.25rem;
  color: #fff;
  border-radius: 0.5rem;
  text-align: center;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1.1rem;
  text-shadow: 2px 3px 3px rgba(0, 0, 0, 0.5);
`;

const ThemeSelector = props => {
	const dispatch = useDispatch();
  return (
    <>
      <Header>Select your theme:</Header>
      <List>
        {IMPOSTER_THEMES.map((theme, i) => (
          <Button key={theme.title}
						onClick={() => dispatch(setTheme(i))}
						style={{ 
							background: theme.secondary,
							border: `${props.selectedTheme === theme.title ? 3 : 1}px solid ${theme.primary}`
						}}
					>
            {theme.title}
          </Button>
        ))}
      </List>
    </>
  );
};

ThemeSelector.propTypes = {
	selectedTheme: PropTypes.string
};

export default ThemeSelector;