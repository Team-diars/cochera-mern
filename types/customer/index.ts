import mongoose from 'mongoose'
import { Request, Response } from 'express';
export interface Car extends mongoose.Document{
  _id: string,
  brand: string,
  model: string,
  licenceplate: string,
  color: string,
  image: Array<string>
}

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