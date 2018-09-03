<template lang="pug">
include ../styles/mixins
div
  +div('Content')(v-html="contact.content")
  +ul('Infos')
    +contact-info('Info')(icon="envelope", label="par courriel") {{ contact.email.value }}
    +contact-info('Info')(icon="phone", label="par téléphone") {{ contact.phone.value }}
    +contact-info('Info')(icon="map-marker-alt", label="par courrier"): +div('Address')
      +span('Address_line') {{ contact.address.street }}
      +span('Address_line') {{ contact.address.extra }}
      +span('Address_line') {{ contact.address.zipcode }} {{ contact.address.city }}
    +contact-info('Info')(icon="share-alt", label="sur les réseaux"): +ul('Socials'): +li('Social')(v-for="item in contact.social") 
      a(href="item.link"): fa-icon(:icon="['fab', item.icon]", size="lg")
</template>

<script lang="ts">
import { Component, FelaMixin, mixins, Rules } from 'nuxt-fela';

import ContactInfo from '~/components/contact-info.vue';
import { contact } from '~/content/options.json';
import { Contact } from '~/definitions';

@Component({ components: { ContactInfo } })
export default class ContactInfos extends mixins(FelaMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  contact: Contact = contact;

  // =================================================================================================================================
  // STYLES
  // =================================================================================================================================

  rules: Rules = {
    Address: { ai: 'flex-end' },
    Address_line: { display: 'block' },
    Content: { mb: 8, textAlign: 'justify' },
    Info: { mb: 2 },
    Infos: { flex: 1 },
    Social: { mr: 4 },
    Socials: { row: true },
  };
}
</script>
