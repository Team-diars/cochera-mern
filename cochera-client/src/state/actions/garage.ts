import { ActionGarageType } from "../action-types/garage";
import {Error} from './index'

export interface GarageCar {
  id: string,
  checkin: Date,
  checkout: Date,
  car: string,
  hasLeftKeyscolor: boolean,
  hasPaid: boolean,
}

export interface GarageState {
  cars: Array<GarageCar>,
  car: GarageCar | null,
  loading: Boolean,
  error: Error | null,
}

interface CreateAction {
  type: ActionGarageType.ADD,
  payload: GarageCar
}
interface RetrieveAction {
  type: ActionGarageType.GET_CARS,
  payload:Array<GarageCar>
}
interface ErrorAction {
  type: ActionGarageType.ERROR,
  payload: Error
}
interface EditAction {
  type: ActionGarageType.EDIT,
  payload: GarageCar
}
interface DeleteAction {
  type: ActionGarageType.DELETE,
  payload: string
}
interface RetrieveSingleCarAction {
  type: ActionGarageType.GET_SINGLE_CAR,
  payload: GarageCar
}
interface ClearCars {
  type: ActionGarageType.CLEAR_CARS,
}

export type GarageAction = RetrieveAction | 
                        ClearCars |
                        CreateAction | 
                        DeleteAction | 
                        EditAction |
                        RetrieveSingleCarAction | 
                        ErrorAction;