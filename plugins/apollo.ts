export default () => ({
  clientState: {
    defaults: {
      breakpoint: 0,
      color: 'green',
      colors: ['blue', 'green', 'red'],
      isMenuActive: false,
      isScrolled: false,
    },
    resolvers: {
      Mutation: {
        updateBreakpoint: (_, data, { cache }) => {
          cache.writeData({ data });
          return null;
        },
        updateColor: (_, data, { cache }) => {
          cache.writeData({ data });
          return null;
        },
        updateMenuActive: (_, data, { cache }) => {
          cache.writeData({ data });
          return null;
        },
        updateScroll: (_, data, { cache }) => {
          cache.writeData({ data });
          return null;
        },
      },
    },
  },
});
