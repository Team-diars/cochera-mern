import axios, { AxiosError } from 'axios';
import { Dispatch } from 'react';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { CustomerAction } from '../actions/customer';

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