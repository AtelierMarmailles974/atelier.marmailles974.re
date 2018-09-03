<template lang="pug">
include ../styles/mixins
+nav('Component'): +v-container('Wrapper')
  +aside('Logo'): img(:src="logo.src", :alt="logo.alt")
  +ul('Menu')
    +li('MenuItem')(v-for="(item, index) in menu", :key="item.id") 
      +nuxt-link('MenuItem_link')(:to="item.link", :exact="item.exact", :active-class="processFela(['MenuItem_link$active'])",
      @click.native="closeMenu")
        fa-icon(v-if="showIcon(item)", :icon="item.icon")
        +span(v-if="!showIcon(item)") {{ item.label }}
  +button('Toggle')(@click="toggleMenu()")
    +div(['Span','Span$top'])
    +div(['Span', 'Span$middle'])
    +div(['Span', 'Span$bottom'])
</template>


<script lang="ts">
import gql from 'graphql-tag';
import { Component, FelaMixin, mixins, Rules, Styles as S } from 'nuxt-fela';

import { logo, menus } from '~/content/options.json';
import { App, Image, Menu, MenuItem } from '~/definitions';
import { ApolloMixin } from '~/mixins/apollo';

@Component
export default class TheNavbar extends mixins(FelaMixin, ApolloMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  data: Pick<App, 'breakpoint' | 'color' | 'isMenuActive' | 'isScrolled'>;
  logo: Image = logo;
  menu: Menu = menus.main;

  // =================================================================================================================================
  // QUERIES
  // =================================================================================================================================

  DATA = gql`
    {
      breakpoint @client
      color @client
      isMenuActive @client
      isScrolled @client
    }
  `;

  // =================================================================================================================================
  // EVENTS
  // =================================================================================================================================

  async closeMenu() {
    await this.$apollo.mutate({
      mutation: gql`
        mutation($isMenuActive: Boolean!) {
          updateMenuActive(isMenuActive: $isMenuActive) @client
        }
      `,
      variables: { isMenuActive: false },
    });
  }

  async toggleMenu() {
    await this.$apollo.mutate({
      mutation: gql`
        mutation($isMenuActive: Boolean!) {
          updateMenuActive(isMenuActive: $isMenuActive) @client
        }
      `,
      variables: { isMenuActive: !this.data.isMenuActive },
    });
  }

  // =================================================================================================================================
  // METHODS
  // =================================================================================================================================

  showIcon(item: MenuItem): boolean {
    return this.data.breakpoint > 2 && !!item.icon;
  }

  // =================================================================================================================================
  // STYLES
  // =================================================================================================================================

  rules: Rules = {
    Component: ({ $theme: { app: { theContactbar, theNavbar }, spaceBase }, data: { isScrolled } }): S => ({
      mt: { base: theContactbar.height / spaceBase, xs: isScrolled ? 0 : theContactbar.height / spaceBase },
      fixT: theNavbar.zIndex,
      w: '100%',
      h: { base: theNavbar.height.base, sm: theNavbar.height.sm },
      py: 1,
      bgC: 'orange',
      sh: '0px 4px 10px 0px rgba(0,0,0,0.4)',
    }),
    Logo: { h: '100%' },
    Menu: ({ $theme: { app: { theNavbar } }, data: { isMenuActive } }): S => ({
      hide: { base: isMenuActive ? 'block' : true, md: false },
      fix: { base: 1, md: false },
      row: { md: 'flex-end' },
      h: { sm: isMenuActive ? undefined : theNavbar.height.sm, md: theNavbar.height.sm },
      pt: { base: 16, md: 0 },
      ct: 'orange',
    }),
    MenuItem: { ml: { base: 0, md: 6 }, bbS: { base: 'dashed', md: 'none' }, bC: 'blueVVL', f: 1.5, fF: 'SpringTime', lS: 1 },
    MenuItem_link: { p: 2, fW: '500', onHover: { ct: 'orangeD' } },
    MenuItem_link$active: ({ data: { color } }): S => ({ ct: color, tr: 'background-color 0.3s linear', onHover: { ct: color } }),
    Span: { mb: 1.5, w: 2, h: 0.25, tr: 'all .3s ease-out', bRd: 10, bgC: 'white' },
    Span$bottom: ({ data: { isMenuActive } }) => ({ transform: isMenuActive ? 'rotate(-45deg) translateX(7px) translateY(-7px)' : 'none' }),
    Span$middle: ({ data: { isMenuActive } }) => ({ opacity: isMenuActive ? 0 : 1 }),
    Span$top: ({ data: { isMenuActive } }) => ({
      mt: 1.5,
      transform: isMenuActive ? 'rotate(45deg) translateX(7px) translateY(7px)' : 'none',
    }),
    Toggle: ({ data: { color, isMenuActive, isScrolled } }) => ({
      mt: { base: isMenuActive ? 0 : 8, xs: isScrolled || isMenuActive ? 0 : 8, sm: isMenuActive ? 0 : isScrolled ? 8 : 12 },
      fixR: 3,
      top: 0,
      w: 4,
      h: 4,
      col: 'center',
      ai: 'center',
      hide: { md: true },
      bgC: {
        base: isMenuActive ? color : 'orange',
        xs: isMenuActive || isScrolled ? color : 'orange',
        sm: isMenuActive ? color : 'orange',
      },
      onHover: {
        bgC: {
          base: isMenuActive ? `${color}D` : 'orangeD',
          xs: isMenuActive || isScrolled ? `${color}D` : 'orangeD',
          sm: isMenuActive ? `${color}D` : 'orangeD',
        },
      },
    }),
    Wrapper: { row: true, jc: 'space-between' },
  };
}
</script>
