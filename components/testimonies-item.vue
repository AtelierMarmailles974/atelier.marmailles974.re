<template lang="pug">
include ../styles/mixins
+div('Component')
  +aside('Aside'): img(:src="item.image.src", :alt="item.image.alt")
  +main('Main')
    +h3('Title') {{ item.title }}
    +h4('Date') {{ localeDate }}
    +div('Content')(v-html="item.content")
    +span('From') {{ item.from }}
</template>


<script lang="ts">
import { DateTime } from 'luxon';
import { Component, FelaMixin, mixins, Prop, Rules } from 'nuxt-fela';

import { Testimony } from '~/definitions';

@Component
export default class TestimoniesItem extends mixins(FelaMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  @Prop() item: Testimony;

  get localeDate(): string {
    return DateTime.fromISO(this.item.date).toLocaleString(DateTime.DATE_SHORT);
  }

  // =================================================================================================================================
  // STYLES
  // =================================================================================================================================

  rules: Rules = {
    Aside: { mx: 'auto', flex: 'none', maxW: 13, p: 2 },
    Component: { row: { xs: true }, bgC: 'white' },
    Content: { mb: 8, w: '100%', pl: 4, blC: 'green', blS: 'solid', blW: 6, textAlign: 'justify', fS: 'italic' },
    Date: { mb: 4, w: '100%', c: 'green', fW: '700' },
    From: { c: 'green', f: 2, fW: '500', fF: 'SpringTime', lS: 1 },
    Main: { col: true, ai: 'flex-end', p: 4 },
    Title: { mb: 2, w: '100%', c: 'orange', f: 2, fW: '500', fF: 'SpringTime', lS: 1, lh: 1 },
  };
}
</script>
