import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { Dispatch } from "react";
import { ActionCarType } from "../action-types/car";
import { Action } from "../actions";
import { Car, CarAction } from "../actions/car";

const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export const addCar = (formData: Car) => async(dispatch: Dispatch<CarAction | Action>) => {
  try {
    const res = await axios.post('/api/customer/create',formData ,config);
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