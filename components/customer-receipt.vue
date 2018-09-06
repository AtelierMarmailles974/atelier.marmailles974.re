<template lang="pug">
include ../styles/mixins
v-section(title="Vous avez reçu votre commande ?", ct="greyVVL")
  +el-form('Form')(ref="form", :model="fdata", :label-width="labelWidth", :rules="validations", :show-message="false", status-icon)
    +p('Description') Nous vous prions de vien vouloir accuser réception de votre commande en remplissant le formulaire suivant : 
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
    el-row  
      el-col(:span="24",:md="12"): +el-form-item('Item')(label="N° du bon de livraison :", prop="ID", required)
        el-input(v-model="fdata.ID", placeholder="Numéro du bon...")
      el-col(:span="24",:md="12"): +el-form-item('Item')(label="Quantité livrée :", prop="COUNT", required)
        +el-input-number('Count')(v-model="fdata.COUNT", controls-position="right", :max="9999", :min="1", :step="10")
    +el-form-item('Item')(label="Observations :", prop="COMMENTS")
      el-input(v-model="fdata.COMMENTS", type="textarea", placeholder="Vos observations...", :rows="4")
    el-form-item(prop="sign", required)
      el-switch(v-model="fdata.sign", active-text="Je reconnais avoir bien reçu les produits de ma commande.", 
      :active-color="$theme.colors.green", :inactive-color="$theme.colors.red")
    +div('Row')
      +img('Image').lazyload(v-bind="image")
      +div('Wrapper')
        p.warning Les réclamations ne sont plus possibles après un délai de 24h après la livraison.
        +el-form-item('Item$submit')(label-width="auto"): el-button(type="primary", :loading="isProcessing", @click="submit")
          +fa-icon('Icon')(v-if="!isProcessing", icon="paper-plane")
          span {{ submitLabel }}
</template>


<script lang="ts">
import { Form } from 'element-ui';
import { Component, FelaMixin, mixins, Rules, Vue } from 'nuxt-fela';
import qs from 'qs';

import { receipt } from '~/content/pages/customer.json';
import { Image } from '~/definitions';
import { BreakpointMixin } from '~/mixins/breakpoint';

@Component
export default class CustomerReceipt extends mixins(FelaMixin, BreakpointMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  $refs: Vue['$refs'] & {
    form: Form;
  };

  fdata = {
    CITY: '',
    COMMENTS: '',
    COUNT: 10,
    EMAIL: '',
    ID: '',
    NAME: '',
    PHONE: '',
    SCHOOL: '',
    sign: false,
  };

  isProcessing = false;

  validations = {
    EMAIL: [{ required: true, message: 'Ce champ est requis.' }, { type: 'email', message: 'Le courriel est invalide.' }],
    sign: [{ validator: (_, v, cb) => cb(v ? undefined : new Error('required')) }],
  };

  get image(): Image {
    const src = receipt.src.replace('/images/customer.', '');
    return {
      ...receipt,
      src: `${require(`!url-loader!sharp-image-loader?width=40&height=40&blurSigma=2!~/static/images/customer.${src}`)}`,
      'data-srcset': `${require(`!file-loader!sharp-image-loader?width=256&height=256!~/static/images/customer.${src}`)} 256w,
      ${require(`!file-loader!sharp-image-loader?width=512&height=512!~/static/images/customer.${src}`)} 512w`,
    };
  }

  get labelWidth(): string {
    return this.breakpoint < 1 ? 'auto' : '11rem';
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
          { templateId: 8, args: { attributes: this.fdata, emailTo: ['admin@ateliermarmailles974.re'] } },
          { templateId: 9, args: { emailTo: [this.fdata.EMAIL] } },
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
    Count: { w: { base: '100%!important', xs: '7rem!important' } },
    Description: { mb: 4, textAlign: { xs: 'justify' } },
    Form: { flex: '100%' },
    Icon: { mr: 2 },
    Image: { mr: { xs: 4 }, mb: 4, flex: 0, w: 16 },
    Item: { mb: '0.25rem!important' },
    Item$email: { maxW: 57.5 },
    Item$submit: { mt: 8, textAlign: 'center' },
    Phone: { w: { xs: '11rem!important' } },
    Row: { col: true, row: { xs: true }, ai: 'center' },
    Wrapper: { flex: 1 },
  };
}
</script>
