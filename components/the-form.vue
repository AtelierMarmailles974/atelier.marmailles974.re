<template lang="pug">
include ../styles/mixins
+v-section(title="Je suis intéressé(e) !", ct="orange")
  +el-form('Form')(ref="form", name="contact", :model="fdata", :rules="validations", label-position="left", :show-message="false",
  status-icon)
    el-row(:gutter="32")
      el-col(:xs="24", :sm="12")
        +el-form-item('Field')(v-for="f in fields", :key="f.id", :prop="f.id", :label="f.label", :required="f.required", label-width="7rem") 
          el-input(v-model="fdata[f.id]", , :maxlength="f.max", :placeholder="f.placeholder")
            i.el-input__icon(v-if="f.icon", slot="prefix", :class="`el-icon-${f.icon}`")
        +p('Explanation') * Ce champ est requis
      el-col(:xs="24", :sm="12")
        el-form-item(prop="COMMENTS", label="Votre message :", :required="false") 
          el-input(v-model="fdata.COMMENTS", type="textarea", :rows="6", placeholder="Vous pouvez entrer ici un message complémentaire.")
        +el-form-item('Field$submit'): el-button(type="info", :loading="isProcessing", @click="submit") 
          +fa-icon('Icon')(v-if="!isProcessing", icon="paper-plane")
          span {{ submitLabel }}
</template>


<script lang="ts">
import { Form } from 'element-ui';
import { Component, FelaMixin, mixins, Rules, Vue } from 'nuxt-fela';
import qs from 'qs';

@Component
export default class TheForm extends mixins(FelaMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  $refs: Vue['$refs'] & {
    form: Form;
  };

  fdata = { COMMENTS: '', EMAIL: '', NAME: '', PHONE: '', SCHOOL: '', SURNAME: '' };

  fields = [
    { id: 'SURNAME', label: 'Nom', max: 50, placeholder: 'Votre nom...', required: true },
    { id: 'NAME', label: 'Prénom', max: 50, placeholder: 'Votre prénom...', required: true },
    { id: 'SCHOOL', label: 'Ecole', max: 50, placeholder: 'Votre école...', required: true },
    { icon: 'phone', id: 'PHONE', label: 'Téléphone', max: 10, placeholder: 'Votre téléphone...', required: false },
    { icon: 'message', id: 'EMAIL', label: 'Courriel', max: 50, placeholder: 'Votre courriel...', required: true },
  ];

  isProcessing = false;

  validations = {
    EMAIL: [{ required: true, message: 'Ce champ est requis.' }, { type: 'email', message: 'Le courriel est invalide.' }],
    NAME: [{ required: true, message: 'Ce champ est requis.' }],
    SCHOOL: [{ required: true, message: 'Ce champ est requis.' }],
    SURNAME: [{ required: true, message: 'Ce champ est requis.' }],
  };

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
            templateId: 5,
            args: {
              attributes: this.fdata,
              emailTo: ['admin@ateliermarmailles974.re'],
            },
          },
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
    Explanation: { mt: 8, fS: 'italic' },
    Field: { mb: '0.5rem!important' },
    Field$submit: { mt: 4, textAlign: 'center' },
    Form: { w: '100%' },
    Icon: { mr: 2 },
  };
}
</script>


<style lang="scss" scoped>
.el-form-item /deep/ .el-form-item__label {
  color: white;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
}
.el-form-item.is-required /deep/ .el-form-item__label:before {
  color: #d1e2db;
}
</style>
