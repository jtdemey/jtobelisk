import { IMPOSTER_THEMES } from './redux/imposterConstants';

export const addAOrAn = str => {
  const vowels = [ ...'aeiou' ];
  if(vowels.some(v => v === str.charAt(0))) {
    return 'an ' + str;
  }
  return 'a ' + str;
};

export const genGameId = () => {
	const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let id = '';
	for(let i = 0; i < 4; i++) {
		const cInd = Math.floor(Math.random() * abc.length);
		const c = abc.charAt(cInd);
		id += c;
	}
	return id;
};

export const getButterySpring = props => ({
	...props,
	config: {
		mass: 1,
		tension: 240,
		friction: 20
	}
});

export const getSyrupySpring = props => ({
	...props,
	config: {
		mass: 4,
		tension: 320,
		friction: 28 
	}
});

export const getRunnySpring = props => ({
	...props,
	config: {
		mass: 1,
		tension: 500,
		friction: 40 
	}
});

export const getTheme = themeIndex => IMPOSTER_THEMES[themeIndex];

export const parseDateStr = isoStr => {
	const b = isoStr.split(/\D+/);
	return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
};