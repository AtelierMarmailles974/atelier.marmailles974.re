<template lang="pug">
include ../styles/mixins
v-section(title="Etes-vous satisfait de nos services ?", ct="greyVVL")
  +el-form('Form')(ref="form", :model="fdata", :label-width="labelWidth", :rules="validations", :show-message="false", status-icon)
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
    +div('Rates').customer-feedback-rates
      +el-form-item('Item$rate')(label="Le projet était-il facile à réaliser ?", prop="EASE"): el-rate(v-model="fdata.EASE")
      +el-form-item('Item$rate')(label="Quel est votre degré de satisfaction ?", prop="CUSTOMER"): el-rate(v-model="fdata.CUSTOMER")
      +el-form-item('Item$rate')(label="Quel est le degré de satisfaction des parents ?", prop="PARENTS"): el-rate(v-model="fdata.PARENTS")
      +el-form-item('Item$rate')(label="Ce type de projet devrait-il être réédité tous les ans avec un produit différent?", prop="RENEW") 
        el-radio-group(v-model="fdata.RENEW", :fill="activeColor")
          el-radio(label="Oui") Oui
          el-radio(label="Non") Non
          el-radio(label="Peut-être") Peut-être
    +div('Row')
      +img('Image').lazyload(v-bind="image")
      +div('Wrapper')
        el-form-item(label="Observations :", prop="COMMENTS", label-width="auto")
          el-input(type="textarea", :rows="4", placeholder="Vos observations...",v-model="fdata.COMMENTS")
        +el-form-item('Item$submit')(label-width="auto"): el-button(type="primary", :loading="isProcessing", @click="submit")
          +fa-icon('Icon')(v-if="!isProcessing", icon="paper-plane")
          span {{ submitLabel }}
</template>


<script lang="ts">
import { Form } from 'element-ui';
import { Component, FelaMixin, mixins, Rules, Vue } from 'nuxt-fela';
import qs from 'qs';

import { feedback } from '~/content/pages/customer.json';
import { Image } from '~/definitions';
import { BreakpointMixin } from '~/mixins/breakpoint';
import { ColorMixin } from '~/mixins/color';

@Component
export default class CustomerFeedback extends mixins(FelaMixin, BreakpointMixin, ColorMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  $refs: Vue['$refs'] & {
    form: Form;
  };

  fdata = {
    CITY: '',
    CUSTOMER: 0,
    COMMENTS: '',
    EASE: 0,
    EMAIL: '',
    NAME: '',
    PARENTS: 0,
    PHONE: '',
    RENEW: 'Oui',
    SCHOOL: '',
  };

  isProcessing = false;

  validations = {
    EMAIL: [{ required: true, message: 'Ce champ est requis.' }, { type: 'email', message: 'Le courriel est invalide.' }],
  };

  get activeColor(): string {
    return this.$theme.colors[this.color];
  }

  get image(): Image {
    const src = feedback.src.replace('/images/customer.', '');
    return {
      ...feedback,
      src: `${require(`!url-loader!sharp-image-loader?width=40&height=40&blurSigma=2!~/static/images/customer.${src}`)}`,
      'data-srcset': `${require(`!file-loader!sharp-image-loader?width=256&height=256!~/static/images/customer.${src}`)} 256w,
      ${require(`!file-loader!sharp-image-loader?width=512&height=512!~/static/images/customer.${src}`)} 512w`,
    };
  }

  get labelWidth(): string {
    return this.breakpoint < 1 ? 'auto' : '8rem';
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
          { templateId: 10, args: { attributes: this.fdata, emailTo: ['admin@ateliermarmailles974.re'] } },
          { templateId: 11, args: { emailTo: [this.fdata.EMAIL] } },
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
    Form: { flex: '100%' },
    Icon: { mr: 2 },
    Image: { mr: { xs: 4 }, mb: 4, flex: 0, w: 16 },
    Item: { mb: '0.25rem!important' },
    Item$email: { maxW: 54.5 },
    Item$rate: { mb: { base: '1rem!important', md: '0!important' }, row: true, wrap: true },
    Item$submit: { mt: 8, textAlign: 'center' },
    Phone: { w: { xs: '11rem!important' } },
    Rates: { mt: 2, mb: 4, px: { base: 4, xs: 8 }, py: 8, ct: 'orange', bRd: 10 },
    Row: { col: true, row: { xs: true }, ai: 'center' },
    Wrapper: { flex: 1, w: '100%' },
  };
}
</script>


<style lang="scss" scoped>
@import '~/styles/theme.scss';

.customer-feedback-rates {
  .el-form-item /deep/ {
    .el-form-item__content {
      margin-left: 0 !important;
    }

    .el-form-item__label {
      color: white;
      flex: 0 0 100%;
      line-height: 1.4;
      margin-bottom: 0.25rem;
      text-align: left;
    }
  }

  .el-rate /deep/ .el-rate__icon.el-icon-star-off {
    color: white !important;
  }
}

.is-blue .customer-feedback-rates .el-rate /deep/ .el-rate__icon.el-icon-star-on {
  color: $blue !important;
}

.is-green .customer-feedback-rates .el-rate /deep/ .el-rate__icon.el-icon-star-on {
  color: $green !important;
}

.is-red .customer-feedback-rates .el-rate /deep/ .el-rate__icon.el-icon-star-on {
  color: $red !important;
}

@media screen and (min-width: $md) {
  .customer-feedback-rates .el-form-item /deep/ .el-form-item__label {
    flex: 0 0 32rem;
    line-height: 40px;
    margin-bottom: 0;
  }
}
</style>
