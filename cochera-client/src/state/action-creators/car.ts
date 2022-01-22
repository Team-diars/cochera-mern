import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Dispatch } from "react";
import { ActionCarType } from "../action-types/car";
import { Action } from "../actions";
import { Car, CarAction } from "../actions/car";

interface CarResponse {
  ok: boolean,
  cars: Array<Car>
}

const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export const getCars = (id: string) => async(dispatch: Dispatch<CarAction | Action>) => {
  try{
    const res = await axios.get<CarResponse>('/api/car/', {
      ...config.headers,
      data: {
        id
      }
    })
    dispatch({
      type: ActionCarType.RETRIEVE,
      payload: res.data.cars
    })
  }catch(err){
    let error = err as AxiosError;
    if (error.response) {
      dispatch({
        type: ActionCarType.RETRIEVE_ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const addCar = (formData: Car) => async(dispatch: Dispatch<CarAction | Action>) => {
  try {
    const res = await axios.post('/api/car/create',{
      ...formData
    },config);
    console.log("res: ",res);
    dispatch({
      type: ActionCarType.ADD,
      payload: res.data.customer
    })

  } catch (err) {
    let error = err as AxiosError;
    if(error.response) {
      dispatch({
        type: ActionCarType.ADD_ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}