import { DefaultTheme, configureFonts } from 'react-native-paper';
import { Fonts } from 'react-native-paper/lib/typescript/src/types';

const fonts: Fonts = {
  regular: {
    fontFamily: 'zilla-slab-regular',
    fontWeight: 'normal',
  },
  medium: {
    fontFamily: 'zilla-slab-medium',
    fontWeight: 'normal',
  },
  light: {
    fontFamily: 'zilla-slab-light',
    fontWeight: 'normal',
  },
  thin: {
    fontFamily: 'zilla-slab-regular',
    fontWeight: 'normal',
  },
};

const fontConfig: { web: Fonts; default: Fonts } = {
  web: fonts,
  default: fonts,
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#24243E',
    accent: '#272745',
    text: 'white',
  },
  fonts: configureFonts(fontConfig),
};

export default theme;
