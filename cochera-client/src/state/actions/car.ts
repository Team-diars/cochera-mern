import { ActionCarType } from "../action-types/car";
import {Error} from './index'

export interface Car {
  _id?: string,
  brand: string,
  model: string,
  licenceplate: string,
  color: string,
  image: Array<string>
}

export interface CarState {
  cars: Array<Car>,
  car: Car | null,
  loading: Boolean,
  error: Error | null,
}

interface CreateAction {
  type: ActionCarType.ADD,
  payload: Car
}
interface CreateError {
  type: ActionCarType.ADD_ERROR,
  payload: Error
}
interface RetrieveAction {
  type: ActionCarType.RETRIEVE,
  payload:Array<Car>
}
interface RetrieveError {
  type: ActionCarType.RETRIEVE_ERROR,
  payload: Error  
}
interface EditAction {
  type: ActionCarType.EDIT,
  payload: Car
}
interface EditError {
  type: ActionCarType.EDIT_ERROR,
  payload: Error
}
interface DeleteAction {
  type: ActionCarType.DELETE,
  payload: string
}
interface DeleteError {
  type: ActionCarType.DELETE_ERROR,
  payload: Error
}
interface RetrieveSingleCarAction {
  type: ActionCarType.RETRIEVE_SINGLE_CAR,
  payload: Car
}

interface RetrieveSingleCarError {
  type: ActionCarType.RETRIEVE_SINGLE_CAR_ERROR,
  payload: Error,
}
interface ClearCars {
  type: ActionCarType.CLEAR_CARS,
}

export type CarAction = RetrieveAction | ClearCars | RetrieveError |
                             CreateAction | CreateError | 
                             DeleteAction | DeleteError |
                             EditAction | EditError |
                             RetrieveSingleCarAction | RetrieveSingleCarError;