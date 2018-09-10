<template lang="pug">
include ../styles/mixins
v-section(title="Votre atelier dessin est terminé ?", ct="greyVVL")
  +el-form('Form')(ref="form", name="shipping", :model="fdata", :rules="validations", :label-width="labelWidth", :show-message="false",
  status-icon)
    el-row
      el-col(:span="24",:md="12"): +el-form-item('Item')(label="Votre nom :", prop="NAME", required)
        el-input(v-model="fdata.NAME", placeholder="Votre nom...")
      el-col(:span="24",:md="12"): +el-form-item('Item')(label="Votre école :", prop="SCHOOL", required)
        el-input(v-model="fdata.SCHOOL", placeholder="Votre école...")
    +el-form-item(['Item','Item$email'])(label="Votre courriel :", prop="EMAIL", required) 
      el-input(v-model="fdata.EMAIL", placeholder="Votre courriel..."): i.el-input__icon.el-icon-message(slot="prefix")
    el-row
      el-col(:span="24", :md="12"): +el-form-item('Item')(label="Ville :", prop="CITY", required) 
        el-input(v-model="fdata.CITY", placeholder="Votre ville...")
      el-col(:span="24", :md="12"): +el-form-item('Item')(label="Téléphone :", prop="PHONE", required)    
        +el-input('Phone')(v-model="fdata.PHONE", placeholder="Votre téléphone...", maxlength="10") 
          i.el-input__icon.el-icon-phone(slot="prefix")
    +div('Switches')
      +p('Description') Avant de déplacer notre transporteur merci à vous de vérifier et de valider les points suivants :
      +el-form-item('Item$switch')(v-for="s of switches", :key="s.id", :prop="s.id", label-width="0")
        el-switch(v-model="fdata[s.id]", :active-text="s.label", :active-color="$theme.colors.green", :inactive-color="$theme.colors.red")
      +a('Tutorial')(href="/pdf/tutoriel.pdf", target="_blank") 
        span Vous pouvez visualiser et télécharger notre tutoriel
        +fa-icon('Tutorial_icon')(icon="file-pdf", size="lg")
    +el-form-item('Item$date').el-form-item--date(label="Merci de m'indiquer la date que vous avez fixée aux parents pour le retour des bons de commande :", label-width="auto", prop="DATE", required) 
      el-date-picker(v-model="fdata.DATE", :clearable="false", format="dd-MM-yyyy", :picker-options="pickerOptions")
    el-form-item(label="Observations :", :label-width="observationWidth", prop="COMMENTS", :required="false")
      el-input(v-model="fdata.COMMENTS", type="textarea", placeholder="Vos observations...", :rows="4" )
    +div('Row')
      +img('Image').lazyload(v-bind="image")
      div
        p.warning 
          | EXPEDITION DES DESSINS :
          | nous vous remercions de remettre au transporteur la grande enveloppe fournie pour le renvoi des dessins à nos bureaux.
        +el-form-item('Item$submit')(label-width="0"): el-button(type="primary", :loading="isProcessing", @click="submit")
          +fa-icon('Icon')(v-if="!isProcessing", icon="paper-plane")
          span {{ submitLabel }}
</template>


<script lang="ts">
import { Form } from 'element-ui';
import { DateTime } from 'luxon';
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
      id: 'forename',
      label: `Le prénom de chaque enfant des petites classes noté par l’enseignant lui-même pour une meilleure visibilité sur 
              l'objet`,
    },
    { id: 'envelope', label: `Utilisation des enveloppes de classe fournies pour classer les dessins` },
    { id: 'pupils', label: `Tous les enfants de l’école ont bien réalisé un dessin` },
    { id: 'count', label: `Le total de dessins réalisés sur l’enveloppe correspond au nombre de cartes dans celle-ci` },
  ];

  fdata = {
    binding: false,
    CITY: '',
    color: false,
    COMMENTS: '',
    count: false,
    DATE: new Date(),
    EMAIL: '',
    envelope: false,
    forename: false,
    NAME: '',
    PHONE: '',
    pupils: false,
    SCHOOL: '',
  };

  isProcessing = false;

  pickerOptions = { disabledDate: (d) => d.getTime() + 24 * 60 * 60 * 1000 < Date.now() };

  validations = {
    binding: [{ validator: (_, v, cb) => cb(v ? undefined : new Error('required')) }],
    color: [{ validator: (_, v, cb) => cb(v ? undefined : new Error('required')) }],
    count: [{ validator: (_, v, cb) => cb(v ? undefined : new Error('required')) }],
    date: [{ required: true, message: 'Ce champ est requis.' }],
    envelope: [{ validator: (_, v, cb) => cb(v ? undefined : new Error('required')) }],
    forename: [{ validator: (_, v, cb) => cb(v ? undefined : new Error('required')) }],
    pupils: [{ validator: (_, v, cb) => cb(v ? undefined : new Error('required')) }],
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

  get labelWidth(): string {
    return this.breakpoint < 1 ? 'auto' : '8rem';
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
      await this.$axios.post(
        '/.netlify/functions/emails',
        qs.stringify([
          {
            templateId: 6,
            args: {
              attributes: { ...this.fdata, DATE: DateTime.fromJSDate(this.fdata.DATE).toLocaleString(DateTime.DATE_MED) },
              emailTo: ['admin@ateliermarmailles974.re'],
            },
          },
          { templateId: 7, args: { emailTo: [this.fdata.EMAIL] } },
        ])
      );
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
    Item: { mb: '0.25rem!important' },
    Item$date: { row: { sm: true } },
    Item$email: { maxW: 54.5 },
    Item$submit: { mt: 8, textAlign: 'center' },
    Item$switch: { mb: { base: '0.25rem!important', xs: '0!important' } },
    Phone: { w: { xs: '11rem!important' } },
    Row: { col: true, row: { xs: true }, ai: 'center' },
    Switches: { my: 4, px: { base: 4, xs: 8 }, py: 8, ct: 'orange', bRd: 10 },
    Tutorial: { mt: 4, row: true, jc: 'center', p: 4, ct: 'orangeD' },
    Tutorial_icon: { ml: 3 },
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
