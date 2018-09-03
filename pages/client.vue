<template lang="pug">
include ../styles/mixins
div
  v-hero(:hero="hero")
  v-section(title="Ma commande étape par étape"): +el-steps('Steps')(:active="active", finish-status="success", align-center)
    +el-step('Step')(v-for="(s, i) of steps", :key="s.id", :title="s.title", :description="s.description", @click.native="selectStep(i)") 
  +main('Wrapper'): +div('Tabs')
    +customer-shipping('Tab')
    +customer-receipt('Tab')
    +customer-feedback('Tab')
</template>


<script lang="ts">
import { Component, FelaMixin, mixins, Rules, Styles as S } from 'nuxt-fela';

import CustomerFeedback from '~/components/customer-feedback.vue';
import CustomerReceipt from '~/components/customer-receipt.vue';
import CustomerShipping from '~/components/customer-shipping.vue';
import { hero } from '~/content/pages/customer.json';
import { Hero } from '~/definitions';

@Component({ components: { CustomerFeedback, CustomerReceipt, CustomerShipping } })
export default class CustomerPage extends mixins(FelaMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  active = 0;
  hero: Hero = hero;

  steps = [
    { description: "Je demande la récupération des dessins", id: 'shipping', title: 'Envoi' },
    { description: "J'accuse réception de ma commande", id: 'receipt', title: 'Réception' },
    { description: 'Je donne mes impressions sur le suivi', id: 'feedback', title: 'Impressions' },
  ];

  // =================================================================================================================================
  // METHODS
  // =================================================================================================================================

  selectStep(index: number) {
    this.active = index;
  }

  // =================================================================================================================================
  // STYLES
  // =================================================================================================================================

  rules: Rules = {
    Step: { cursor: 'pointer' },
    Steps: { w: '100%' },
    Tab: { flex: 'none', w: '100%' },
    Tabs: ({ active }): S => ({ row: 'stretch', transform: `translateX(-${active}00%)`, transition: 'all 0.2s' }),
    Wrapper: { overflow: 'hidden' },
  };
}
</script>


<style lang="scss" scoped>
@import "~/styles/theme.scss";

.el-step /deep/ .el-step__description {
  display: none;
}

@media screen and (min-width: $sm) {
  .el-step /deep/ .el-step__description {
    display: inherit;
  }
}
</style>
