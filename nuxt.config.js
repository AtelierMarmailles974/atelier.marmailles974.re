module.exports = {
  apollo: {
    clientConfigs: {
      default: '~/plugins/apollo.ts',
    },
  },
  axios: {
    proxy: true,
    retry: { retries: 3 },
  },
  build: {
    analyze: true,
  },
  css: ['typeface-roboto'],
  elementUi: {
    components: [
      'button',
      'col',
      'datePicker',
      'form',
      'formItem',
      'icon',
      'input',
      'inputNumber',
      'message',
      'option',
      'radio',
      'radioGroup',
      'rate',
      'row',
      'select',
      'step',
      'steps',
      'switch',
    ],
  },
  fela: {
    fonts: '~/styles/fonts',
    theme: '~/styles/theme',
    statics: ['~/styles/main.scss', '~/styles/main'],
  },
  fontawesome: {
    component: 'fa-icon',
    imports: [
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['faFacebookF', 'faFacebookMessenger', 'faGooglePlusG', 'faSkype', 'faViber', 'faWhatsapp'],
      },
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: [
          'faAsterisk',
          'faBars',
          'faEnvelope',
          'faHome',
          'faMapMarkerAlt',
          'faPaperPlane',
          'faPhone',
          'faPiggyBank',
          'faShareAlt',
          'faSquare',
          'faStar',
          'faTag',
        ],
      },
    ],
  },
  googleMaps: { key: 'AIzaSyDc6WY-88kRxrIg7Llk1NXmmZQO_rMNqVE' },
  head: {
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  },
  modules: ['nuxt-typescript', '@nuxtjs/apollo', '@nuxtjs/axios', 'nuxt-element-ui', 'nuxt-google-maps', 'nuxt-fontawesome', 'nuxt-fela'],
  plugins: [{ src: '~/plugins/lazysizes.ts', ssr: false }, '~/plugins/ui.ts'],
  proxy: {
    '/.netlify/functions': {
      target: 'http://localhost:9000',
      pathRewrite: { '^/.netlify/functions': '' },
    },
  },
};
