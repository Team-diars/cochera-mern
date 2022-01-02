import { ActionType } from "../action-types";

export interface Payload {
  fullname: string,
  cellphone: string,
  address: string,
}

interface RetrieveAction {
  type: ActionType.RETRIEVE,
  payload:Payload
}

export type Action = RetrieveAction;