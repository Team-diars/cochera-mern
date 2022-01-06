import axios, { AxiosError } from 'axios';
import { Dispatch } from 'react';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { CustomerAction, Payload } from '../actions/customer';

const config= {
  headers: {
    'Content-Type': 'application/json'
  }
}

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