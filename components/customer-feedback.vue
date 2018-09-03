<template lang="pug">
include ../styles/mixins
v-section(title="Etes-vous satisfait de nos services ?", ct="greyVVL")
  +el-form('Form')(ref="form", :model="form", :label-width="labelWidth", :show-message="false", status-icon)
    el-row
      el-col(:span="24",:md="12"): +el-form-item('Item')(label="Votre nom :", prop="name", :required="true")
        el-input(v-model="form.name")
      el-col(:span="24",:md="12"): +el-form-item('Item')(label="Votre école :", prop="school", :required="true")
        el-input(v-model="form.school")
    el-row
      el-col(:span="24", :md="12"): +el-form-item('Item')(label="Ville :", prop="city", :required="true") 
        el-input(v-model="form.city")
      el-col(:span="24", :md="12"): +el-form-item('Item')(label="Téléphone :", prop="phone", :required="true")    
        +el-input('Phone')(v-model="form.phone", maxlength="10"): i.el-input__icon.el-icon-phone(slot="prefix")
    +div('Rates').customer-feedback-rates
      +el-form-item('Item$rate')(label="Le projet était-il facile à réaliser ?"): el-rate(v-model="form.ease")
      +el-form-item('Item$rate')(label="Quel est votre degré de satisfaction ?"): el-rate(v-model="form.customer")
      +el-form-item('Item$rate')(label="Quel est le degré de satisfaction des parents ?"): el-rate(v-model="form.parents")
      +el-form-item('Item$rate')(label="Ce type de projet devrait-il être réédité tous les ans avec un produit différent?") 
        el-radio-group(v-model="form.renew", :fill="activeColor")
          el-radio(label="Oui") Oui
          el-radio(label="Non") Non
          el-radio(label="Peut-être") Peut-être
    +div('Row')
      +img('Image').lazyload(v-bind="image")
      +div('Wrapper')
        el-form-item(label="Observations :", label-width="auto")
          el-input(type="textarea", :rows="3", placeholder="Votre commentaire...",v-model="form.comment")
        +el-form-item('Item$submit')(label-width="auto"): el-button(type="primary", :loading="isProcessing", @click="submit")
          +fa-icon('Icon')(v-if="!isProcessing", icon="paper-plane")
          span {{ submitLabel }}
</template>


<script lang="ts">
import { Form } from 'element-ui';
import { Component, FelaMixin, mixins, Rules, Vue } from 'nuxt-fela';

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

  form = {
    city: '',
    customer: 0,
    comment: '',
    name: '',
    parents: 0,
    phone: '',
    ease: 0,
    renew: 'Oui',
    school: '',
  };

  isProcessing = false;

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
    await new Promise((r) => setTimeout(r, 2000));
    // await this.$axios.post(this.$refs.form.$attrs.action, qs.stringify(this.form));
    this.isProcessing = false;
    this['$message'].success('Votre message a été envoyé avec succès.');
    this.$refs.form.resetFields();
  }

  // =================================================================================================================================
  // STYLES
  // =================================================================================================================================

  rules: Rules = {
    Form: { flex: '100%' },
    Icon: { mr: 2 },
    Image: { mr: { xs: 4 }, mb: 4, flex: 0, w: 16 },
    Item: { mb: '0.25rem!important' },
    Item$rate: { mb: { base: '1rem!important', md: '0!important' }, row: true, wrap: true },
    Item$submit: { mt: 8, textAlign: 'center' },
    Phone: { w: { xs: '10rem!important' } },
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
