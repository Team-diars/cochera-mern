const Car = require("../models/car");
const GarageCar = require('../models/garage');
import { Request, Response } from "express";
import { Customer as ICustomer, CustomRequest } from "../types/customer";
import { GarageCar } from "../types/garage";

const createGarageCar = async(req: CustomRequest<GarageCar>, res: Response) => {
  try {
    const {checkin,car:licenceplate,hasLeftKeys,customprice} = req.body;
    const carExists = await Car.findOne({ licenceplate, status: 1 });
    if (!carExists){
      res.status(400).json({
        ok:false,
        msg: 'El carro no existe'
      })
    }
    if (new Date(checkin) < new Date()){
      res.status(400).json({
        ok:false,
        msg: 'Fecha de entrada debe ser mayor o igual a hoy.'
      })
    }
    const car = {
      checkin,
      car: licenceplate,
      hasLeftKeys,
      customprice: (customprice > 0) ? customprice : 0,
    };
    const newGarageCar = new GarageCar(car);
    await newGarageCar.save();
    return res.status(200).json({
      ok: true,
      msg: 'Carro agregado exitosamente',
      car: newGarageCar
    })
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Ocurrio un error" + err,
    });
  }
}
const getGarageCars = async(req: CustomRequest<GarageCar>, res: Response) => {

}
const updateGarageCar = async(req: CustomRequest<GarageCar>, res: Response) => {

}
const deleteGarageCar = async(req: CustomRequest<GarageCar>, res: Response) => {

}
const setCheckOutCar = async(req: CustomRequest<GarageCar>, res: Response) => {

}
const payAllTicketsPerCustomer = async(req: CustomRequest<GarageCar>, res: Response) => {

}
module.exports = {
  createGarageCar,
  getGarageCars,
  updateGarageCar,
  deleteGarageCar,
  setCheckOutCar,
  payAllTicketsPerCustomer
}