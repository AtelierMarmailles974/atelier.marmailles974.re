import gql from 'graphql-tag';
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  apollo: {
    color: gql`
      {
        color @client
      }
    `,
  },
})
export class ColorMixin extends Vue {
  color: string;
}
