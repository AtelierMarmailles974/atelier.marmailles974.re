import { Article } from '~/definitions';

const Context = require.context('.', false, /\.(json)$/);

export default Context.keys().map<Article>(Context);
