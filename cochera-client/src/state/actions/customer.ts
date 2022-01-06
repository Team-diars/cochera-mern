import { ActionType } from "../action-types";
import {Error} from './index'

export interface Payload {
  id: string | null,
  fullname: string,
  cellphone: string,
  address: string,
}

export interface CustomerState {
  customers: Array<Payload>,
  customer: Payload | null,
  loading: Boolean,
  error: Error | null,
}
interface CreateAction {
  type: ActionType.ADD,
  payload: Payload
}
interface CreateError {
  type: ActionType.ADD_ERROR,
  payload: Error
}
interface RetrieveAction {
  type: ActionType.RETRIEVE,
  payload:Payload
}

interface ClearCustomers {
  type: ActionType.CLEAR_CUSTOMERS,
}

interface RetrieveError {
  type: ActionType.RETRIEVE_ERROR,
  payload: Error  
}

export type CustomerAction = RetrieveAction | ClearCustomers | RetrieveError |
                             CreateAction | CreateError