import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Response } from 'express';
import { Dispatch } from 'react';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { CustomerAction, Payload } from '../actions/customer';

const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
}

// const handlingError = (error: AxiosError, 
//                       dispatch: Dispatch<CustomerAction | Action>,
//                       actiontype: ActionType.ADD_ERROR | ActionType.DELETE_ERROR): void => {
//   // let error = err as AxiosError;
//   if(error.response) {
//     dispatch({
//       type: ActionType[actiontype],
//       payload: {
//         msg: error.response.data,
//         status: error.response.status
//       }
//     })
//   }
// }

export const getCustomers = () => async(dispatch: Dispatch<CustomerAction | Action>) => {
  dispatch({
    type: ActionType.CLEAR_CUSTOMERS,
  })
  try {
    const res = await axios.get("/api/customer", config);
    // console.log("res: ",res);
    dispatch({
      type: ActionType.RETRIEVE,
      payload: res.data.customers
    })
  } catch (err) {
    let error = err as AxiosError;
    if(error.response) {
      dispatch({
        type: ActionType.RETRIEVE_ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}
export const addCustomer = (formData: Payload) => async(dispatch: Dispatch<CustomerAction | Action>) => {
  try {
    const res = await axios.post('/api/customer/create',formData ,config);
    console.log("res: ",res);
    dispatch({
      type: ActionType.ADD,
      payload: res.data.customer
    })

  } catch (err) {
    let error = err as AxiosError;
    if(error.response) {
      dispatch({
        type: ActionType.RETRIEVE_ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const updateCustomer = (formData: Payload) => async(dispatch: Dispatch<CustomerAction | Action>) => {
  try {
    let response = await axios.put(`/api/customer/update/${formData.id}`,formData ,config);
    dispatch({
      type: ActionType.EDIT,
      payload: response.data,
    })
  } catch (err) {
    let error = err as AxiosError;
    if (error.response){
      dispatch({
        type: ActionType.EDIT_ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const deleteCustomer = (id: string) => async(dispatch: Dispatch<CustomerAction | Action>) => {
  try {
    await axios.delete(`/api/customer/delete`, {
      ...config.headers,
      data: {
        id: id
      }
    });
    dispatch({
      type:ActionType.DELETE,
      payload: id
    });
  } catch (err) {
    let error = err as AxiosError;
    if(error.response) {
      dispatch({
        type: ActionType.RETRIEVE_ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}