import { VNodeDirective } from 'vue';

export default {
  name: 'scroll',
  inserted: (el: HTMLElement, { value }: VNodeDirective) => {
    window.addEventListener('scroll', value);
    el['_onScroll'] = { value };
  },
  unbind: (el: HTMLElement) => {
    if (!el['_onScroll']) return;
    window.removeEventListener('scroll', el['_onScroll'].value);
    delete el['_onScroll'];
  },
};
