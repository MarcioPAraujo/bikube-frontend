const gray = {
  hex_353535: '#353535',
  hex_e2e2e2: '#E2E2E2',
  hex_d7d7d7: '#D7D7D7',
  hex_1b1b1b: '#1B1B1B',
};
const red = {
  dark: '#D32F2F',
  normal: '#EB5757',
  light: '#FFEBEE',
};
const green = {
  hex_018D1F: '#018D1F',
};
const blue = {
  darker: '#2F80ED',
  dark: '#2D9CDB',
  normal: '#56CCF2',
  light: '#EBF8FF',
};
const yellow = {
  hex_F6B31B: '#F6B31B',
};

export const theme = {
  colors: {
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    GRAY: gray,
    RED: red,
    GREEN: green,
    BLUE: blue,
    YELLOW: yellow,
  },
} as const;
