import { AxiosStatic } from 'axios';
import { Message } from 'element-ui';
import { Renderer, Theme } from 'nuxt-fela';
import Vue from 'vue';
import { ApolloProperty } from 'vue-apollo/types/vue-apollo';
import { VueApolloComponentOption } from 'vue-apollo/types/options';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    apollo?: VueApolloComponentOption<V>;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $apollo: ApolloProperty<any>;
    $axios: AxiosStatic;
    $fela: Renderer;
    $message: Message;
    $theme: Theme;
  }
}
