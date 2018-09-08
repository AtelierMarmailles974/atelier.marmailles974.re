<template lang="pug">
include ../styles/mixins
+div('Component'): +v-container('Wrapper')(v-bind="$attrs")
  +h3('Title')(v-if="title") {{ title }}
  slot
</template>


<script lang="ts">
import { Component, FelaMixin, mixins, Prop, Rules, Styles as S } from 'nuxt-fela';

import { ColorMixin } from '~/mixins/color';

@Component
export default class VSection extends mixins(FelaMixin, ColorMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  @Prop() ct: string;
  @Prop() title: string;

  // =================================================================================================================================
  // STYLES
  // =================================================================================================================================

  rules: Rules = {
    Component: ({ color, ct }): S => ({ ct: ct || color, py: 8, tr: 'background-color 0.3s linear' }),
    Title: { mb: 8, flex: '100%', textAlign: 'center', f: { base: 2, xs: 3 }, fW: '500', fF: 'SpringTime', lS: 1 },
    Wrapper: { row: 'flex-start', jc: 'center', ac: 'flex-start', wrap: true },
  };
}
</script>
