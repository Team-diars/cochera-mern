import { ActionType } from "../action-types";
import { CustomerAction, CustomerState, Payload } from "../actions/customer";

const initialState: CustomerState = {
  customers: [],
  customer: null,
  loading: true,
  error: null,
}

const reducer = (state: CustomerState = initialState, action: CustomerAction) => {
  switch(action.type){
    case ActionType.RETRIEVE:
      return {
        ...state,
        customers: action.payload,
        loading: false,
        error: null,
      }
    case ActionType.ADD:
      return {
        ...state,
        customers: [action.payload, ...state.customers],
        loading: false,
        error: null
      }
    case ActionType.ADD_ERROR:
    case ActionType.RETRIEVE_ERROR:
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