<template lang="pug">
include ../styles/mixins
+div('Component'): slot
</template>


<script lang="ts">
import { Component, FelaMixin, mixins, Prop, Rules, Styles as S } from 'nuxt-fela';

@Component
export default class VContainer extends mixins(FelaMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  @Prop({
    default: 'center',
    type: String,
    validator: (value) => ['center', 'left', 'right'].indexOf(value) !== -1,
  })
  align: 'center' | 'left' | 'right';

  @Prop({ default: 1, type: Number })
  divider: number;

  // =================================================================================================================================
  // STYLES
  // =================================================================================================================================

  rules: Rules = {
    Component: ({ $theme: { maxWidth }, align, divider }): S => ({
      ...{ ml: (align === 'right' || align === 'center') && 'auto', mr: (align === 'left' || align === 'center') && 'auto' },
      ...{ w: '100%', maxW: maxWidth / divider, h: '100%' },
      px: { base: 2, xs: 4, sm: 8 },
    }),
  };
}
</script>
