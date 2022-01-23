import { ActionCarType } from "../action-types/car";
import { CarAction, CarState } from "../actions/car";

const initialState: CarState = {
  cars: [],
  car: null,
  loading: true,
  error: null,
}

const reducer = (state: CarState = initialState, action: CarAction) => {
  switch(action.type){
    case ActionCarType.ADD:
      return {
        ...state,
        cars: [action.payload, ...state.cars],
        loading: false,
        error: null
      }
    case ActionCarType.RETRIEVE:
      return {
        ...state,
        cars: [...action.payload],
        loading:false,
        error:null,
      }
    case ActionCarType.RETRIEVE_SINGLE_CAR:
      return {
        ...state,
        car: action.payload,
        loading:false,
        error:null
      }
    case ActionCarType.EDIT:
      return {
        ...state,
        loading: false,
        customers: state.cars.map(car => car.licenceplate === action.payload.licenceplate ? car = action.payload : car)
      }
    case ActionCarType.DELETE:
      return {
        ...state,
        loading: false,
        customers: state.cars.filter(car => car.licenceplate !== action.payload)
      }
    case ActionCarType.CLEAR_CARS:
      return {
        ...state,
        cars: [],
        loading: false
      }
    case ActionCarType.RETRIEVE_SINGLE_CAR_ERROR:
    case ActionCarType.EDIT_ERROR:
    case ActionCarType.DELETE_ERROR:
    case ActionCarType.RETRIEVE_ERROR:  
    case ActionCarType.ADD_ERROR:
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