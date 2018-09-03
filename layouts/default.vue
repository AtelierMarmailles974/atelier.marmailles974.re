<template lang="pug">
include ../styles/mixins
div(v-scroll="onScroll", :class="'is-' + color")
  the-contactbar
  the-navbar
  +nuxt('Content')
  the-form
  the-footer
</template>


<script lang="ts">
import gql from 'graphql-tag';
import { Component, FelaMixin, mixins, Rules } from 'nuxt-fela';

import TheContactbar from '~/components/the-contactbar.vue';
import TheFooter from '~/components/the-footer.vue';
import TheForm from '~/components/the-form.vue';
import TheNavbar from '~/components/the-navbar.vue';
import { ColorMixin } from '~/mixins/color';

@Component({ components: { TheContactbar, TheFooter, TheForm, TheNavbar } })
export default class DefaultLayout extends mixins(ColorMixin, FelaMixin) {
  // =================================================================================================================================
  // CYCLE
  // =================================================================================================================================

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  }

  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  // =================================================================================================================================
  // EVENTS
  // =================================================================================================================================

  async onResize() {
    let breakpoint = 0;
    const width: number = window.innerWidth;
    if (width >= this.$theme.breakpoints.xxl) breakpoint = 6;
    else if (width >= this.$theme.breakpoints.xl) breakpoint = 5;
    else if (width >= this.$theme.breakpoints.lg) breakpoint = 4;
    else if (width >= this.$theme.breakpoints.md) breakpoint = 3;
    else if (width >= this.$theme.breakpoints.sm) breakpoint = 2;
    else if (width >= this.$theme.breakpoints.xs) breakpoint = 1;

    await this.$apollo.mutate({
      mutation: gql`
        mutation($breakpoint: String!) {
          updateBreakpoint(breakpoint: $breakpoint) @client
        }
      `,
      variables: { breakpoint },
    });
  }

  async onScroll() {
    await this.$apollo.mutate({
      mutation: gql`
        mutation($isScrolled: Boolean!) {
          updateScroll(isScrolled: $isScrolled) @client
        }
      `,
      variables: { isScrolled: window.pageYOffset > 0 },
    });
  }

  // =================================================================================================================================
  // STYLES
  // =================================================================================================================================

  rules: Rules = {
    Content: { pt: 24 },
  };
}
</script>
