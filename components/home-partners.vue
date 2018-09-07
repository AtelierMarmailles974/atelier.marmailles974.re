<template lang="pug">
include ../styles/mixins
v-section(v-if="hasPartners", title="Nous travaillons ensemble", ct="greyVVL"): ul: li(v-for="p of partners", key="p.title")
  a(:href="p.link")
    img.lazyload(v-bind="p.image")
    span {{ p.title }}
</template>


<script lang="ts">
import { Component, FelaMixin, mixins, Prop, Rules } from 'nuxt-fela';

import { Partner } from '~/definitions';

@Component
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

  rules: Rules = {};
}
</script>
