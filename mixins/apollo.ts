import { Component } from 'nuxt-property-decorator';
import Vue from 'vue';

@Component({
  apollo: {
    data() {
      return {
        query: this.DATA,
        update: (data) => data,
      };
    },
  },
})
export class ApolloMixin<Data> extends Vue {
  data: Data;
  DATA: string;
}
