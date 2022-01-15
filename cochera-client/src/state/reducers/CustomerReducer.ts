import { ActionType } from "../action-types";
import { CustomerAction, CustomerState } from "../actions/customer";

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
    case ActionType.RETRIEVE_SINGLE_CUSTOMER:
      return {
        ...state,
        customer: action.payload,
        loading:false,
        error:null
      }
    case ActionType.ADD:
      return {
        ...state,
        customers: [action.payload, ...state.customers],
        loading: false,
        error: null
      }
    case ActionType.EDIT:
      return {
        ...state,
        loading: false,
        customers: state.customers.map(customer => customer.id === action.payload.id ? customer = action.payload : customer)
      }
    case ActionType.DELETE:
      return {
        ...state,
        loading: false,
        customers: state.customers.filter(customer => customer.id !== action.payload)
      }
    case ActionType.EDIT_ERROR:
    case ActionType.DELETE_ERROR:
    case ActionType.ADD_ERROR:
    case ActionType.RETRIEVE_ERROR:
    case ActionType.RETRIEVE_SINGLE_CUSTOMER_ERROR:
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