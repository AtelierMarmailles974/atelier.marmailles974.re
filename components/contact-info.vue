<template lang="pug">
include ../styles/mixins
+li('Component')
  +div('Label')
    +fa-icon('Icon')(v-if="icon", :icon="icon")
    | {{ label }}
  slot
</template>

<script lang="ts">
import { Component, FelaMixin, mixins, Prop, Rules, Styles as S } from 'nuxt-fela';

import { ColorMixin } from '~/mixins/color';

@Component
export default class ContactInfo extends mixins(FelaMixin, ColorMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  @Prop() icon: string;
  @Prop() label: string;

  // =================================================================================================================================
  // STYLES
  // =================================================================================================================================

  rules: Rules = {
    Component: ({ color }): S => ({ mb: 2, row: { xs: true, sm: false, md: true }, jc: 'space-between', p: 4, bgC: `${color}D` }),
    Icon: { mr: 2 },
    Label: { mb: { base: 1, xs: 0, sm: 1, md: 0 }, mr: { xs: 2, sm: 0, md: 2 }, fW: '700', uppercase: true },
  };
}
</script>
