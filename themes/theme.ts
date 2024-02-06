/* theme.ts */
import {theme as chakraTheme} from '@chakra-ui/react';
import {extendTheme} from '@chakra-ui/react';
import {url} from 'inspector';
import bgImage from '../public/GroupBg.svg';
//sizes should be tested
const colors = {
  ...chakraTheme.colors,
  customColor: {
    defaultColor: '#475569',
    clickedColor: '#677589',
    // Lisää muita värejä tarvittaessa
  },
};

const sizes = {
  sizes: {
    max: 'max-content',
    min: 'min-content',
    full: '100%',
    '3xs': '14rem',
    '2xs': '16rem',
    xs: '20rem',
    sm: '24rem',
    md: '28rem',
    lg: '32rem',
    xl: '36rem',
    '2xl': '42rem',
    '3xl': '48rem',
    '4xl': '56rem',
    '5xl': '64rem',
    '6xl': '72rem',
    '7xl': '80rem',
    '8xl': '90rem',
    container: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
};
const breakpoints = {
  base: '0em',
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
};

const styles = {
  global: {
    'html, body': {
      background: `url(${bgImage.src})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      minHeight: '100vh',
    },
    h1: {
      fontSize: '72px ',
      color: 'rgba(148, 163, 184, 1)',
      lineHeight: '1.2',
      letterSpacing: '0',
    },
    p: {
      fontSize: '24px',
      color: 'rgba(148, 163, 184, 1)',
    },
  },
};
export const customTheme = extendTheme({colors, styles, sizes, breakpoints});

export default customTheme;
