const gray = {
  hex_353535: '#353535',
  hex_454545: '#454545',
  hex_696969: '#696969',
  hex_747474: '#747474',
  hex_919191: '#919191',
  hex_999999: '#999999',
  hex_2e2e2e: '#2E2E2E',
  hex_e2e2e2: '#E2E2E2',
  hex_d7d7d7: '#D7D7D7',
  hex_1b1b1b: '#1B1B1B',
};
const red = {
  hex_B9375D: '#B9375D',
  hex_D32F2F: '#D32F2F',
  hex_EB5757: '#EB5757',
  hex_FFEBEE: '#FFEBEE',
};
const green = {
  hex_FEFAE0: '#FEFAE0',
  hex_78C841: '#78C841',
  hex_018D1F: '#018D1F',
  hex_4A9782: '#4A9782',
};
const blue = {
  darker: '#2F80ED',
  dark: '#2D9CDB',
  normal: '#56CCF2',
  light: '#EBF8FF',
};
const yellow = {
  hex_F6B31B: '#F6B31B',
  hex_FFB936: '#FFB936',
  hex_9E4A00: '#9E4A00',
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
