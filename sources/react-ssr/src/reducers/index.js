import { combineReducers } from 'redux'
import products from './products';
import craftercms from './craftercms';

export default (asyncReducers) => combineReducers({
  craftercms,
  products,
  ...asyncReducers
})
