import { ActionType } from "../action-types";
import { CustomerAction, CustomerState, Payload } from "../actions/customer";

const initialState: CustomerState = {
  customers: [],
  customer: null,
  loading: true,
  error: null,
}

const reducer = (state: CustomerState, action: CustomerAction) => {
  switch(action.type){
    case ActionType.RETRIEVE:
      return {
        ...state,
        loading: false,
      }
    default:
      return reducer;
  }
}

export default reducer;