import {combineReducers} from 'redux';
import customerReducer from './CustomerReducer';
import carReducer from './CarReducer';
const reducers = combineReducers({
  customers: customerReducer,
  cars: carReducer
})

export default reducers;
export type State = ReturnType<typeof reducers>