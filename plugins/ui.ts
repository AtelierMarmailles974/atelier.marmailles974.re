import { Vue } from 'nuxt-fela';

import VContainer from '~/components/v-container.vue';
import VHero from '~/components/v-hero.vue';
import VIntroduction from '~/components/v-introduction.vue';
import VSection from '~/components/v-section.vue';
import scroll from '~/directives/scroll';

Vue.component('v-container', VContainer);
Vue.component('v-hero', VHero);
Vue.component('v-introduction', VIntroduction);
Vue.component('v-section', VSection);

Vue.directive('scroll', scroll);
