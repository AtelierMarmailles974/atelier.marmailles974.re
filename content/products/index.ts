import { Product } from '~/definitions';

const Context = require.context('.', false, /\.(json)$/);

export default Context.keys().map<Product>(Context);
