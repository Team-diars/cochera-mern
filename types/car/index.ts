import mongoose from 'mongoose'

export interface Car extends mongoose.Document{
  _id: string,
  brand: string,
  model: string,
  licenceplate: string,
  color: string,
  image: Array<string>,
  customer: string,
}