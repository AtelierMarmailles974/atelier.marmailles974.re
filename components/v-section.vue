<template lang="pug">
include ../styles/mixins
+div('Component'): +v-container('Wrapper')(:align="align", :type="type")
  +h3('Title') {{ title }}
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

  @Prop({
    default: 'center',
    type: String,
    validator: (value) => ['center', 'left', 'right'].indexOf(value) !== -1,
  })
  align: string;

  @Prop() ct: string;

  @Prop({ default: 1, type: Number })
  type: number;

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
