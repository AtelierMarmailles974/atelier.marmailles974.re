module.exports = {
  apollo: {
    clientConfigs: {
      default: '~/plugins/apollo.ts',
    },
  },
  axios: {
    proxy: process.env.NODE_ENV !== 'production',
    retry: { retries: 3 },
  },
  build: {
    analyze: true,
  },
  css: ['typeface-roboto'],
  elementUI: {
    components: [
      'Button',
      'Col',
      'DatePicker',
      'Form',
      'FormItem',
      'Icon',
      'Input',
      'InputNumber',
      'Message',
      'Option',
      'Radio',
      'RadioGroup',
      'Rate',
      'Row',
      'Select',
      'Step',
      'Steps',
      'Switch',
    ],
    locale: 'fr',
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
          'faFilePdf',
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
  googleMaps: { key: 'AIzaSyCz179NmFWowTkO3IE5nzCkpZe_Z8oSc0Q' },
  head: {
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  },
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/sitemap',
    'nuxt-element-ui',
    'nuxt-fela',
    'nuxt-fontawesome',
    'nuxt-google-maps',
    'nuxt-typescript',
  ],
  plugins: [{ src: '~/plugins/lazysizes.ts', ssr: false }, '~/plugins/ui.ts'],
  proxy: {
    '/.netlify/functions': {
      target: 'http://localhost:9000',
      pathRewrite: { '^/.netlify/functions': '' },
    },
  },
  sitemap: {
    exclude: ['/admin/**'],
    hostname: 'https://atelier.marmailles974.re',
  },
};
