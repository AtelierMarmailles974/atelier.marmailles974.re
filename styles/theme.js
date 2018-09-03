module.exports = {
  app: {
    theContactbar: {
      height: 2,
      zIndex: 3,
    },
    theNavbar: {
      height: { base: 4, sm: 6 },
      zIndex: 2,
    },
  },
  breakpoints: {
    xs: 544,
    sm: 768,
    md: 992,
    lg: 1280,
    xl: 1488,
    xxl: 2512,
  },
  colors: {
    black: '#000',
    black50: 'rgba(0, 0, 0, .5)',

    greyVVD: '#222',
    greyVD: '#333',
    greyD: '#555',
    grey: '#777',
    greyL: '#999',
    greyVL: '#bbb',
    greyVVL: '#e7e6e9',

    white: '#ffffff',

    blueVD: '#01649d',
    blueD: '#027dc6',
    blue: '#03acee',
    blueVVL: '#d1e2db',

    greenVD: '#247b32',
    greenD: '#2fa343',
    green: '#62b848',

    orangeD: '#db7d0a',
    orange: '#f59523',

    redVD: '#8a0f13',
    redD: '#c4161c',
    red: '#ec1b26',
  },
  contexts: {
    blue: { bgC: 'blue', c: 'white' },
    blueD: { bgC: 'blueD', c: 'white' },
    green: { bgC: 'green', c: 'white' },
    greenD: { bgC: 'greenD', c: 'white' },
    grey: { bgC: 'grey', c: 'white' },
    greyD: { bgC: 'greyD', c: 'white' },
    orangeD: { bgC: 'orangeD', c: 'white' },
    orange: { bgC: 'orange', c: 'white' },
    red: { bgC: 'red', c: 'white' },
    redD: { bgC: 'redD', c: 'white' },
  },
  maxWidth: 75,
  spaceBase: 0.25,
};
