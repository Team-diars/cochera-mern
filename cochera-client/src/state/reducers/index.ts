import {combineReducers} from 'redux';
import customerReducer from './CustomerReducer';
import carReducer from './CarReducer';
import settingsReducer from './SettingsReducer';
const reducers = combineReducers({
  customers: customerReducer,
  cars: carReducer,
  settings: settingsReducer
})

export default reducers;
export type State = ReturnType<typeof reducers>