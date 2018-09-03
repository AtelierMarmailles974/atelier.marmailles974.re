<template lang="pug">
include ../styles/mixins
+nav('Component'): +v-container('Wrapper')
  +ul('List')
    +li('Contact', '{ isFirst: j === 0, isScrolled: data.isScrolled }')(v-for="(i, j) in [contact.phone, contact.email]", :key="i.icon") 
      +a('Link')(:href="`${i.type}:${i.value}`")
        fa-icon(:icon="i.icon")
        +span('Contact_label') {{ i.value }}
  +ul('List')
    +li('Color','c')(v-for="c in data.colors", :key="c", @click="changeColor(c)")
    +li('Social')(v-for="s in contact.social", :key="s.icon"): +a('Link')(:href="s.value"): fa-icon(:icon="['fab',s.icon]", size="lg")
</template>


<script lang="ts">
import gql from 'graphql-tag';
import { Component, FelaMixin, mixins, Rules, Styles as S } from 'nuxt-fela';

import { contact } from '~/content/options.json';
import { App, Contact } from '~/definitions';
import { ApolloMixin } from '~/mixins/apollo';

@Component
export default class TheContactBar extends mixins(FelaMixin, ApolloMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  contact: Contact = contact;
  data: App;

  // =================================================================================================================================
  // EVENTS
  // =================================================================================================================================

  async changeColor(color: string) {
    await this.$apollo.mutate({
      mutation: gql`
        mutation($color: String!) {
          updateColor(color: $color) @client
        }
      `,
      variables: { color },
    });
  }

  // =================================================================================================================================
  // QUERIES
  // =================================================================================================================================

  DATA = gql`
    {
      color @client
      colors @client
      isMenuActive @client
      isScrolled @client
    }
  `;

  // =================================================================================================================================
  // STYLES
  // =================================================================================================================================

  rules: Rules = {
    Color: (bgC): S => ({ ml: 2, w: 1.25, h: 1.25, bgC, bS: 'solid', bC: 'white', bW: 1, cursor: 'pointer' }),
    Component: ({ $theme: { app: { theContactbar: { height, zIndex }, theNavbar } }, data: { color, isMenuActive, isScrolled } }): S => ({
      ...{ hide: { base: isMenuActive, md: false }, fixT: zIndex, right: { xs: isScrolled && 4, sm: 0 } },
      w: { base: '100%', xs: isScrolled ? 'auto' : '100%' },
      h: { base: height, xs: isScrolled ? theNavbar.height.base : height, sm: height },
      bgC: { base: color, xs: isScrolled ? 'orange' : color, sm: color },
      ...{ bW: 1, bbS: 'dashed', blS: { sm: isScrolled && 'dashed' } },
      bC: { base: 'blueVVL', xs: isScrolled ? 'orange' : 'blueVVL', sm: 'blueVVL' },
      tr: 'background-color 0.3s linear',
    }),
    Contact: ({ isFirst, isScrolled }): S =>
      isFirst ? { mr: 2 } : { hide: { base: true, xs: isScrolled }, pl: 2, blW: 2, blS: 'solid', blC: 'white' },
    Contact_label: { ml: 1 },
    Link: { row: true },
    List: { row: true },
    Social: ({ data: { isScrolled } }): S => ({ hide: { base: true, sm: isScrolled }, ml: 4 }),
    Wrapper: { row: true, jc: 'space-between' },
  };
}
</script>
