<template lang="pug">
include ../styles/mixins
v-section(title="Votre atelier dessin est terminé ?", ct="greyVVL")
  +el-form('Form')(ref="form", name="shipping", netlify, :model="fdata", :rules="validations", label-position="left", :show-message="false",
  status-icon)
    +div('Switches')
      +p('Description') Avant de déplacer notre transporteur merci à vous de vérifier et de valider les points suivants :
      +el-form-item('Item$switch')(v-for="s of switches", :key="s.id", :prop="s.id")
        el-switch(v-model="fdata[s.id]", :active-text="s.label", :active-color="$theme.colors.green", :inactive-color="$theme.colors.red")
    +el-form-item('Item$date').el-form-item--date(label="Merci de m'indiquer la date que vous avez fixée aux parents pour le retour des bons de commande :", prop="date", :required="true") 
      el-date-picker(v-model="fdata.date", :clearable="false", format="dd-MM-yyyy", :picker-options="pickerOptions")
    +el-form-item(['Item','Item$email'])(label="Votre courriel :", prop="email", required, :label-width="observationWidth")
      el-input(v-model="fdata.email"): i.el-input__icon.el-icon-message(slot="prefix")
    el-form-item(label="Observations :", :label-width="observationWidth", prop="comments", :required="false")
      el-input(v-model="fdata.comments", type="textarea", :rows="4" )
    +div('Row')
      +img('Image').lazyload(v-bind="image")
      div
        p.warning 
          | EXPEDITION DES DESSINS :
          | nous vous remercions de remettre au transporteur la grande enveloppe fournie pour le renvoi des dessins à nos bureaux.
        +el-form-item('Item$submit'): el-button(type="primary", :loading="isProcessing", @click="submit")
          +fa-icon('Icon')(v-if="!isProcessing", icon="paper-plane")
          span {{ submitLabel }}
</template>


<script lang="ts">
import { Form } from 'element-ui';
import { Component, FelaMixin, mixins, Rules, Vue } from 'nuxt-fela';
import qs from 'qs';

import { shipping } from '~/content/pages/customer.json';
import { Image } from '~/definitions';
import { BreakpointMixin } from '~/mixins/breakpoint';
import { ColorMixin } from '~/mixins/color';

@Component
export default class CustomerShipping extends mixins(FelaMixin, BreakpointMixin, ColorMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  $refs: Vue['$refs'] & {
    form: Form;
  };

  switches = [
    {
      id: 'color',
      label: `Les dessins sont réalisés uniquement avec les feutres noirs d'ATELIER MARMAILLES (aucune peinture, feutre de couleur, crayon
              ...)"`,
    },
    { id: 'binding', label: `Aucune agrafe, trombone ou tout autre système utilisé pour relier les dessins` },
    {
      id: 'name',
      label: `Le prénom de chaque enfant des petites classes noté par l’enseignant lui-même pour une meilleure visibilité sur 
              l'objet`,
    },
    { id: 'envelope', label: `Utilisation des enveloppes de classe fournies pour classer les dessins` },
    { id: 'pupils', label: `Tous les enfants de l’école ont bien réalisé un dessin` },
    { id: 'count', label: `Le total de dessins réalisés sur l’enveloppe correspond au nombre de cartes dans celle-ci` },
  ];

  fdata = {
    binding: false,
    color: false,
    comments: '',
    count: false,
    date: Date.now(),
    email: '',
    envelope: false,
    name: false,
    pupils: false,
  };

  isProcessing = false;

  pickerOptions = { disabledDate: (d) => d.getTime() + 24 * 60 * 60 * 1000 < Date.now() };

  validations = {
    date: [{ required: true, message: 'Ce champ est requis.' }],
  };

  get image(): Image {
    const src = shipping.src.replace('/images/customer.', '');
    return {
      ...shipping,
      src: `${require(`!url-loader!sharp-image-loader?width=40&height=40&blurSigma=2!~/static/images/customer.${src}`)}`,
      'data-srcset': `${require(`!file-loader!sharp-image-loader?width=256&height=256!~/static/images/customer.${src}`)} 256w,
      ${require(`!file-loader!sharp-image-loader?width=512&height=512!~/static/images/customer.${src}`)} 512w`,
    };
  }

  get observationWidth(): string {
    return this.breakpoint < 2 ? 'auto' : '8rem';
  }

  get submitLabel() {
    return this.isProcessing ? 'Envoi en cours' : 'Envoyer';
  }

  // =================================================================================================================================
  // EVENTS
  // =================================================================================================================================

  submit() {
    this.$refs.form.validate((isValid) => this._validate(isValid));
  }

  // =================================================================================================================================
  // METHODS
  // =================================================================================================================================

  protected async _validate(isValid: boolean) {
    if (!isValid) return this.$message.error('Certains champs sont invalides.');
    this.isProcessing = true;
    try {
      await this.$axios.post('/.netlify/functions/shipping', qs.stringify(this.fdata));
      this.$message.success('Votre message a été envoyé avec succès.');
      this.$refs.form.resetFields();
    } catch (error) {
      this.$message.error("Une erreur est survenue durant l'envoi. Veuillez réessayer ultérieurement.");
    }
    this.isProcessing = false;
  }

  // =================================================================================================================================
  // STYLES
  // =================================================================================================================================

  rules: Rules = {
    Description: { mb: 4, textAlign: { xs: 'justify' } },
    Form: { flex: '100%' },
    Icon: { mr: 2 },
    Image: { mr: { xs: 4 }, mb: 4, flex: 0, w: 16 },
    Item$date: { row: { sm: true } },
    Item$submit: { mt: 8, textAlign: 'center' },
    Item$switch: { mb: { base: '0.25rem!important', xs: '0!important' } },
    Row: { col: true, row: { xs: true }, ai: 'center' },
    Switches: { mb: 4, px: { base: 4, xs: 8 }, py: 8, ct: 'orange', bRd: 10 },
  };
}
</script>


<style lang="scss" scoped>
@import '~/styles/theme.scss';

.el-form-item--date /deep/ .el-form-item__label {
  line-height: 1.4;
  margin-bottom: 0.5rem;
}

.el-switch /deep/ .el-switch__label {
  color: white;
  &.is-active {
    color: white;
  }
}

@media screen and (min-width: $sm) {
  .el-form-item--date /deep/ .el-form-item__label {
    margin-bottom: 0;
  }
}
</style>
