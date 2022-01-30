import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Dispatch } from "react";
import { ActionGarageType } from "../action-types/garage";
import { Action } from "../actions";
import { Car } from "../actions/car";
import { GarageAction, GarageCar } from "../actions/garage";

interface CarResponse {
  ok: boolean,
  cars: Array<GarageCar>,
}

const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export const getGarageCars = () => async(dispatch: Dispatch<GarageAction | Action>) => {
  dispatch({
    type: ActionGarageType.CLEAR_CARS,
  })
  try{
    const res = await axios.get<CarResponse>(`http://localhost:8000/api/garage/`,config)
    dispatch({
      type: ActionGarageType.GET_CARS,
      payload: res.data.cars
    })
  }catch(err){
    let error = err as AxiosError;
    if (error.response) {
      dispatch({
        type: ActionGarageType.ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}
export const getSingleGarageCar = (id: string) => async(dispatch: Dispatch<GarageAction | Action>) => {
  try {
    const res = await axios.get(`http://localhost:8000/api/garage/show/${id}`,config);
    console.log("res: ",res)
    dispatch({
      type: ActionGarageType.GET_SINGLE_CAR,
      payload: res.data.car
    })
  } catch (err) {
    let error = err as AxiosError;
    if (error.response) {
      dispatch({
        type: ActionGarageType.ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}
export const addGarageCar = (formData: Car) => async(dispatch: Dispatch<GarageAction | Action>) => {
  try {
    const res = await axios.post('http://localhost:8000/api/garage/create',{
      ...formData
    },config);
    dispatch({
      type: ActionGarageType.ADD,
      payload: res.data.car
    })

  } catch (err) {
    let error = err as AxiosError;
    if(error.response) {
      dispatch({
        type: ActionGarageType.ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}
export const updateGarageCar = (id:string, formData: GarageCar) => async(dispatch: Dispatch<GarageAction | Action>) => {
  try {
    let {data} = await axios.put(`/api/garage/edit/${id}`,formData ,config);
    dispatch({
      type: ActionGarageType.EDIT,
      payload: data.car,
    })
  } catch (err) {
    let error = err as AxiosError;
    if (error.response){
      dispatch({
        type: ActionGarageType.ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}
export const deleteGarageCar = (id: string) => async(dispatch: Dispatch<GarageAction | Action>) => {
  try {
    await axios.delete(`/api/garage/delete/${id}`,config);
    dispatch({
      type:ActionGarageType.DELETE,
      payload: id
    });
  } catch (err) {
    let error = err as AxiosError;
    if(error.response) {
      dispatch({
        type: ActionGarageType.ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}