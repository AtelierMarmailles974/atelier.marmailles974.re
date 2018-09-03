<template lang="pug">
include ../styles/mixins
div
  v-hero(:hero="hero")
  +div('Row')
    +v-section('Infos')(title="Contactez-nous", :type="breakpoint < 3 ? 1 : 2", align="right"): contact-infos
    +gmap-map('Map')(:center="center", :zoom="15"): gmap-marker(:position="center")
</template>


<script lang="ts">
import { Component, FelaMixin, mixins, Rules } from 'nuxt-fela';

import ContactInfos from '~/components/contact-infos.vue';
import { contact } from '~/content/options.json';
import { hero } from '~/content/pages/contact.json';
import { Contact, Hero } from '~/definitions';
import { BreakpointMixin } from '~/mixins/breakpoint';

@Component({ components: { ContactInfos } })
export default class ContactPage extends mixins(FelaMixin, BreakpointMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  contact: Contact = contact;
  hero: Hero = hero;

  get center() {
    return { lat: this.contact.address.latitude, lng: this.contact.address.longitude };
  }

  // =================================================================================================================================
  // STYLES
  // =================================================================================================================================

  rules: Rules = {
    Infos: { flex: { base: '100%', sm: '50%' } },
    Map: { flex: { base: '100%', sm: '50%' }, h: { base: '70vh', sm: 'auto' } },
    Row: { row: 'stretch', wrap: true },
  };
}
</script>
