import mongoose from 'mongoose'
import { Request, Response } from 'express';
import { Car } from '../car';

export interface Customer extends mongoose.Document{
  _id: string,
  fullname: string, 
  cellphone: string,
  address: string,
  status: number,
  cars: Array<Car>,
  date: Date
}

export interface CustomRequest<T> extends Request {
  body: T
}