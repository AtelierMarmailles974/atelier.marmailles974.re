<template lang="pug">
include ../styles/mixins
div
  v-hero(:hero="hero")
  v-section(ct="greyVVL") 
    +ul('Members'): +li('Member', 'i')(v-for="(m, i) of memberz", :key="'member_' + i")
      +img('Image').lazyload(v-bind="m.image")
      +h4('Name') {{ m.name }}
      +h5('Role') {{ m.role }}
    +div('Content')(v-html="content")
</template>


<script lang="ts">
import { Component, FelaMixin, mixins, Rules, Styles as S } from 'nuxt-fela';

import { content, hero, members } from '~/content/pages/about.json';
import { Hero, Member } from '~/definitions';

@Component({ head: { title: 'A propos - ATELIER MARMAILLES 974' } } as any)
export default class AboutPage extends mixins(FelaMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  content: string = content;
  hero: Hero = hero;
  members: Member[] = members;

  get memberz() {
    return members.map((m) => {
      const src = m.image.src.replace('/images/member.', '');
      return {
        ...m,
        image: {
          ...m.image,
          src: `${require(`!url-loader!sharp-image-loader?width=40&blurSigma=3!~/static/images/member.${src}`)}`,
          'data-srcset': `${require(`!file-loader!sharp-image-loader?width=288!~/static/images/member.${src}`)} 288w,
          ${require(`!file-loader!sharp-image-loader?width=576!~/static/images/member.${src}`)} 576w`,
        },
      };
    });
  }

  // =================================================================================================================================
  // STYLES
  // =================================================================================================================================

  rules: Rules = {
    Content: { f: { xs: 1.25 }, textAlign: 'justify' },
    Image: { w: '100%' },
    Member: (i): S => ({
      mb: { base: 2, xs: 0 },
      ml: { xs: i !== 0 ? 4 : 0 },
      maxW: 18,
      flex: 1,
      p: 2,
      ct: i % 3 === 0 ? 'blue' : i % 3 === 1 ? 'green' : 'red',
      textAlign: 'center',
    }),
    Members: { mb: { xs: 12 }, w: '100%', col: 'space-between', ai: 'center', row: { xs: 'stretch' } },
    Name: { f: 3, fF: 'SpringTime', lS: 1 },
    Role: { fW: '700' },
  };
}
</script>
