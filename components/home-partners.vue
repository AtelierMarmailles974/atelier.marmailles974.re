<template lang="pug">
include ../styles/mixins
v-section(v-if="hasPartners", title="Nous travaillons ensemble"): +ul('Partners'): +li('Partner')(v-for="p of partners", :key="p.title")
  home-partner(:partner="p")
</template>


<script lang="ts">
import { Component, FelaMixin, mixins, Prop, Rules } from 'nuxt-fela';

import HomePartner from '~/components/home-partner.vue';
import { Partner } from '~/definitions';

@Component({ components: { HomePartner } })
export default class HomePartners extends mixins(FelaMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  @Prop({ default: [], type: Array })
  partners: Partner[];

  get hasPartners(): boolean {
    return this.partners.length > 0;
  }

  // =================================================================================================================================
  // STYLES
  // =================================================================================================================================

  rules: Rules = {
    Partner: { mx: 2, my: 1, w: 12 },
    Partners: { row: true, wrap: true, jc: 'center' },
  };
}
</script>
