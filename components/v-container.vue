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

  @Prop({ default: 75, type: Number })
  maxWidth: number;

  @Prop({ default: 1, type: Number })
  type: number;

  // =================================================================================================================================
  // STYLES
  // =================================================================================================================================

  rules: Rules = {
    Component: ({ align, maxWidth, type }): S => ({
      ...{ ml: (align === 'right' || align === 'center') && 'auto', mr: (align === 'left' || align === 'center') && 'auto' },
      ...{ w: '100%', maxW: maxWidth / type, h: '100%' },
      px: { base: 2, xs: 4, sm: 8 },
    }),
  };
}
</script>
