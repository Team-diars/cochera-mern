import axios from 'axios';
import { Dispatch } from 'react';
import { Action } from '../actions';

const config= {
  headers: {
    'Content-Type': 'application/json'
  }
}

export const getCustomers = () => async(dispatch: Dispatch<Action>) => {
  
}