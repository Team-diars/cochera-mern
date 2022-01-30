import { ActionCarType } from "../action-types/car";
import { ActionGarageType } from "../action-types/garage";
import { CarAction, CarState } from "../actions/car";
import { GarageState, GarageAction } from "../actions/garage";

const initialState: GarageState = {
  cars: [],
  car: null,
  loading: true,
  error: null,
}

const reducer = (state: GarageState = initialState, action: GarageAction) => {
  switch(action.type){
    case ActionGarageType.ADD:
      return {
        ...state,
        cars: [action.payload, ...state.cars],
        loading: false,
        error: null
      }
    case ActionGarageType.GET_CARS:
      return {
        ...state,
        cars: [...action.payload],
        loading:false,
        error:null,
      }
    case ActionGarageType.GET_SINGLE_CAR:
      return {
        ...state,
        car: action.payload,
        loading:false,
        error:null
      }
    case ActionGarageType.EDIT:
      return {
        ...state,
        loading: false,
        cars: state.cars.map(car => car.id === action.payload.id ? car = action.payload : car)
      }
    case ActionGarageType.DELETE:
      return {
        ...state,
        loading: false,
        cars: state.cars.filter(car => car.id !== action.payload)
      }
    case ActionGarageType.CLEAR_CARS:
      return {
        ...state,
        cars: [],
        loading: false
      }
    case ActionGarageType.ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    default:
      return state;
  }
}
export default reducer;