<template lang="pug">
include ../styles/mixins
+div('Component').home-product-pricing
  +main('Main')
    +el-form('Form')(:model="form", label-position="left")
      +el-form-item('Item')(label="Nombre d'élèves"): +el-input-number('Count')(v-model="form.count", :min="0", :max="1000", :step="10")
      +el-form-item('Item')(label="Prix de revente"): +el-select('Price')(v-model="form.price")
        el-option(v-for="o in options", :key="o.value", :label="o.label", :value="o.value")
    +div(['Value','Value$coop']) 
      span Coopérative :
      span {{ toEuros(pricing.coop) }}  
  +div(['Value','Value$profit']) 
    +fa-icon('Value$profit_icon')(icon="piggy-bank", size="lg")
    span {{ toEuros(profit) }}
  +el-button('Button')(type="primary", @click="showProfit")
    +fa-icon('Icon')(icon="piggy-bank", size="lg")
    span Simulez votre bénéfice
</template>


<script lang="ts">
import _range from 'lodash/range';
import { Component, FelaMixin, mixins, Prop, Rules, Styles as S } from 'nuxt-fela';

import { ProductPricing } from '~/definitions';
import { BreakpointMixin } from '~/mixins/breakpoint';
import { ColorMixin } from '~/mixins/color';

@Component
export default class HomeProductPricing extends mixins(FelaMixin, BreakpointMixin, ColorMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  @Prop() pricing: ProductPricing;
  @Prop() ct: string;

  form = { count: 100, price: 0 };

  profitShown = false;

  get options(): { label: string; value: number }[] {
    return _range(this.pricing.min, this.pricing.max).map((value) => ({ value, label: this.toEuros(value) }));
  }

  get profit(): number {
    return this.form.count * (this.form.price - this.pricing.coop);
  }

  // =================================================================================================================================
  // LIFECYCLE
  // =================================================================================================================================

  created() {
    this.form.price = this.pricing.selected;
  }

  // =================================================================================================================================
  // EVENTS
  // =================================================================================================================================

  showProfit() {
    this.profitShown = true;
  }

  // =================================================================================================================================
  // METHODS
  // =================================================================================================================================

  toEuros(value: number): string {
    const cents = (value * 100).toString();
    return value === 0 ? '0,00€' : `${cents.substr(0, cents.length - 2)},${cents.substr(cents.length - 2, 2)}€`;
  }

  // =================================================================================================================================
  // STYLES
  // =================================================================================================================================

  rules: Rules = {
    Button: ({ profitShown }): S => ({ pinL: 1, top: profitShown ? '-100%' : 0, w: '100%', h: '100%', bRd: '0!important', tr: 'all 1s' }),
    Component: ({ ct }): S => ({ ct, relative: true, overflow: 'hidden', row: { xs: 'stretch' } }),
    Count: { w: '8.75rem!important' },
    Form: { w: '100%', row: { sm: true }, jc: 'space-around', p: 2 },
    Icon: { mr: 2 },
    Item: { mb: { base: '0.25rem!important', sm: '0!important' }, d: 'flex!important', jc: 'space-between' },
    Main: { w: '100%', row: { md: 'stretch' } },
    Price: { w: 6.5 },
    Value: { w: '100%', row: true, py: 2, px: 4, uppercase: true },
    Value$coop: { flex: '0 0 13rem', jc: 'space-between', ct: 'grey' },
    Value$profit: { flex: '0 0 12rem', jc: 'center', ct: 'orange', f: 1.5 },
    Value$profit_icon: { mr: 2 },
  };
}
</script>


<style lang="scss" scoped>
@import '~/styles/theme.scss';

.home-product-pricing {
  .el-form-item /deep/ .el-form-item__label {
    flex: 1;
    color: white;
  }
}
</style>
