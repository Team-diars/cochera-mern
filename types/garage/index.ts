import mongoose from 'mongoose'
export interface IGarageCar extends mongoose.Document{
  id?: string,
  checkin: Date,
  checkout?: Date,
  car: string,
  hasLeftKeys: boolean,
  hasPaid: boolean,
  customprice: number,
}