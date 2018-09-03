import gql from 'graphql-tag';
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  apollo: {
    breakpoint: gql`
      {
        breakpoint @client
      }
    `,
  },
})
export class BreakpointMixin extends Vue {
  breakpoint: number;
}
