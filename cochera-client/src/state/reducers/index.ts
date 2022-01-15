import {combineReducers} from 'redux';
import customerReducers from './CustomerReducer';

const reducers = combineReducers({
  customers: customerReducers,
})

export default reducers;
export type State = ReturnType<typeof reducers>