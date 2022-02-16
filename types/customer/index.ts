import mongoose from 'mongoose'
import { Request, Response } from 'express';
import { ICar } from '../car';

export interface ICustomer extends mongoose.Document{
  _id: string,
  fullname: string, 
  cellphone: string,
  address: string,
  status: number,
  cars: Array<ICar>,
  date: Date
}

export interface CustomRequest<T> extends Request {
  body: T
}