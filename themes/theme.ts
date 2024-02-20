/* theme.ts */
import {StyleFunctionProps, theme as chakraTheme} from '@chakra-ui/react';
import {extendTheme} from '@chakra-ui/react';
import {url} from 'inspector';
import bgImage from '../public/GroupBg.svg';
import {mode} from '@chakra-ui/theme-tools';

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
  global: (props: StyleFunctionProps) => ({
    body: {
      // sets a custom bg color for dark mode only
      bg: mode(
        // light mode value retrieved from theme
        '#27AAE1',
        // your custom value for dark mode
        '#252C32'
      )(props),
    },
  }),
};

const colors = {
  qlimax: {
    'bg-blue': '#27AAE1',
    'bg-pink': '#F17DB1',
    'bg-yellow': '#F9ED32',
    'text-black': '#000000',
  },
};
export const customTheme = extendTheme({styles, sizes, breakpoints, colors});

export default customTheme;
