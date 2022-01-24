import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Dispatch } from "react";
import { ActionCarType } from "../action-types/car";
import { Action } from "../actions";
import { Car, CarAction } from "../actions/car";

interface CarResponse {
  ok: boolean,
  cars: Array<Car>,
}

const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export const getCars = (id: string) => async(dispatch: Dispatch<CarAction | Action>) => {
  dispatch({
    type: ActionCarType.CLEAR_CARS,
  })
  try{
    const res = await axios.get<CarResponse>(`http://localhost:8000/api/car/${id}`,config)
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
export const getSingleCar = (id: string, customerid: string) => async(dispatch: Dispatch<CarAction | Action>) => {
  try {
    const res = await axios.get(`http://localhost:8000/api/car/show/${id}`,config);
    console.log("res: ",res)
    dispatch({
      type: ActionCarType.RETRIEVE_SINGLE_CAR,
      payload: res.data.car
    })
  } catch (err) {
    let error = err as AxiosError;
    if (error.response) {
      dispatch({
        type: ActionCarType.RETRIEVE_SINGLE_CAR_ERROR,
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
    const res = await axios.post('http://localhost:8000/api/car/create',{
      ...formData
    },config);
    dispatch({
      type: ActionCarType.ADD,
      payload: res.data.car
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
export const updateCar = (customerid:string, formData: Car) => async(dispatch: Dispatch<CarAction | Action>) => {
  try {
    let {data} = await axios.put(`http://localhost:8000/api/car/edit/${customerid}`,formData ,config);
    console.log("EDIT-data: ",data)
    dispatch({
      type: ActionCarType.EDIT,
      payload: data.car,
    })
  } catch (err) {
    let error = err as AxiosError;
    if (error.response){
      dispatch({
        type: ActionCarType.EDIT_ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}
export const deleteCar = (id: string) => async(dispatch: Dispatch<CarAction | Action>) => {
  try {
    await axios.delete(`/api/car/delete/${id}`,config);
    dispatch({
      type:ActionCarType.DELETE,
      payload: id
    });
  } catch (err) {
    let error = err as AxiosError;
    if(error.response) {
      dispatch({
        type: ActionCarType.DELETE_ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}