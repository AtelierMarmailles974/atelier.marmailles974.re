const native = {
  a: { display: 'block', c: 'white', fW: '700', textDecoration: 'none' },
  'h1, h2, h3, h4, h5, h6': { f: '100%', fW: 'inherit', lh: 1.1, m: 0 },
  'a:hover': { c: 'greyD' },
  body: { bgC: 'greyVVL', fF: 'Roboto', lh: 1.4 },
  button: { py: 0.25, bgC: 'greyD', bW: 0, c: 'white', uppercase: true, cursor: 'pointer' },
  'button:focus': { outline: 'none' },
  'button:hover': { ct: 'grey' },
  html: { overflowX: 'hidden' },
  img: { d: 'block', maxW: '100%', maxH: '100%' },
  p: { m: 0 },
  ul: { m: 0, p: 0, listStyle: 'none' },
};

const classes = {
  '.atelier': { f: 1.25, fW: '700', uppercase: true, c: 'greyD' },
  '.bold': { fW: '700' },
  '.emphasize': { py: 4, px: 4, ct: 'greyD', f: { base: 2, xs: 2.5 }, fF: 'SpringTime', textAlign: 'center' },
  '.marmailles': { f: 2, fF: 'SpringTime', lS: 1, textTransform: 'capitalize', c: 'orange' },
  '.orange': { c: 'orange' },
  '.paragraph': { mb: 4, textAlign: 'justify' },
  '.subtitle': { fW: '700', uppercase: true },
  '.is-blue .subtitle': { c: 'blueVD' },
  '.is-green .subtitle': { c: 'greenVD' },
  '.is-red .subtitle': { c: 'redVD' },
  '.warning': { py: 4, px: 4, ct: 'greyD', bxW: 8, bxS: 'solid', fS: 'italic', textAlign: 'center' },
  '.is-blue .warning': { bxC: 'blue' },
  '.is-green .warning': { bxC: 'green' },
  '.is-red .warning': { bxC: 'red' },
};

const elButton = {
  '.is-blue .el-button.el-button--primary': { bC: 'blue', ct: 'blue' },
  '.is-blue .el-button.el-button--primary:hover': { bC: 'blueD', ct: 'blueD' },
  '.is-green .el-button.el-button--primary': { bC: 'green', ct: 'green' },
  '.is-green .el-button.el-button--primary:hover': { bC: 'greenD', ct: 'greenD' },
  '.is-red .el-button.el-button--primary': { bC: 'red', ct: 'red' },
  '.is-red .el-button.el-button--primary:hover': { bC: 'redD', ct: 'redD' },
};

const elDatePicker = {
  '.is-blue .el-date-table td.current span': { bgC: 'blue' },
  '.is-blue .el-date-table td.today span': { c: 'blue' },
  '.is-green .el-date-table td.current span': { bgC: 'green' },
  '.is-green .el-date-table td.today span': { c: 'green' },
  '.is-red .el-date-table td.current span': { bgC: 'red' },
  '.is-red .el-date-table td.today span': { c: 'red' },
};

const elFormItem = {
  '.el-form-item .el-form-item__label': { c: 'black' },
};

const elInput = {
  '.el-input': { f: '1rem!important' },
};

const elInputNumber = {
  '.el-input-number .el-input-number__decrease:hover': { c: 'greyVL' },
  '.el-input-number .el-input-number__increase:hover': { c: 'greyVL' },
};

const elMessage = {
  '.el-message.el-message--error': { bgC: 'red', bC: 'red' },
  '.el-message.el-message--error .el-message__content': { c: 'white' },
  '.el-message.el-message--error .el-message__icon': { c: 'white' },
  '.el-message.el-message--success': { bgC: 'green', bC: 'green' },
  '.el-message.el-message--success .el-message__content': { c: 'white' },
  '.el-message.el-message--success .el-message__icon': { c: 'white' },
};

const elRadio = {
  '.el-radio .el-radio__inner:hover': { bC: 'grey' },
  '.is-blue .el-radio__input.is-checked .el-radio__inner': { bC: 'blue', bgC: 'blue' },
  '.is-blue .el-radio__input.is-checked + .el-radio__label': { c: 'blue' },
  '.is-green .el-radio__input.is-checked .el-radio__inner': { bC: 'green', bgC: 'green' },
  '.is-green .el-radio__input.is-checked + .el-radio__label': { c: 'green' },
  '.is-red .el-radio__input.is-checked .el-radio__inner': { bC: 'red', bgC: 'red' },
  '.is-red .el-radio__input.is-checked + .el-radio__label': { c: 'red' },
};

const elStep = {
  '.el-step .el-step__description.is-process': { c: 'white' },
  '.el-step .el-step__head.is-process': { bC: 'white', c: 'white' },
  '.el-step .el-step__title.is-process': { c: 'white' },
  '.el-step .el-step__description.is-success': { c: 'white' },
  '.el-step .el-step__head.is-success': { bC: 'white', c: 'white' },
  '.el-step .el-step__title.is-success': { c: 'white' },
  '.el-step__head.is-success .el-step__line-inner': { bW: '1px!important', w: '100%!important' },
  '.is-blue .el-step__icon': { bgC: 'blue' },
  '.is-blue .el-step__line': { bgC: 'blueVD' },
  '.is-blue .el-step__description.is-wait': { c: 'blueVD' },
  '.is-blue .el-step__head.is-wait': { bC: 'blueVD', c: 'blueVD' },
  '.is-blue .el-step__title.is-wait': { c: 'blueVD' },
  '.is-green .el-step__icon': { bgC: 'green' },
  '.is-green .el-step__line': { bgC: 'greenVD' },
  '.is-green .el-step__description.is-wait': { c: 'greenVD' },
  '.is-green .el-step__head.is-wait': { bC: 'greenVD', c: 'greenVD' },
  '.is-green .el-step__title.is-wait': { c: 'greenVD' },
  '.is-red .el-step__icon': { bgC: 'red' },
  '.is-red .el-step__line': { bgC: 'redVD' },
  '.is-red .el-step__description.is-wait': { c: 'redVD' },
  '.is-red .el-step__head.is-wait': { bC: 'redVD', c: 'redVD' },
  '.is-red .el-step__title.is-wait': { c: 'redVD' },
};

const elSwitch = {
  '.el-switch': { h: 'auto!important' },
  '.el-switch .el-switch__core': { flex: 'none' },
  '.el-switch .el-switch__label': { h: 'auto', c: 'black' },
  '.el-switch .el-switch__label.is-active': { c: 'black' },
};

const elTextarea = {
  '.el-textarea': { f: '1rem!important' },
};

export default {
  ...native,
  ...elButton,
  ...elDatePicker,
  ...elFormItem,
  ...elInput,
  ...elInputNumber,
  ...elMessage,
  ...elRadio,
  ...elStep,
  ...elSwitch,
  ...elTextarea,
  ...classes,
};
