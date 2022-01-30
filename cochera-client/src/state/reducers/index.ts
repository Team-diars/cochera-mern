import {combineReducers} from 'redux';
import customerReducer from './CustomerReducer';
import carReducer from './CarReducer';
import settingsReducer from './SettingsReducer';
import garageReducer from './GarageReducer';
const reducers = combineReducers({
  customers: customerReducer,
  cars: carReducer,
  settings: settingsReducer,
  garage: garageReducer
})

export default reducers;
export type State = ReturnType<typeof reducers>