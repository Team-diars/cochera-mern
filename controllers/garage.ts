import { Request, Response } from "express";
import { CustomRequest, ICustomer } from "../types/customer";
import { IGarageCar } from "../types/garage";
import { ICar } from "../types/car";
const dayjs = require('dayjs');
const Car = require("../models/car");
const Customer = require("../models/customer");
const GarageCar = require('../models/garage');

const createGarageCar = async(req: CustomRequest<IGarageCar>, res: Response) => {
  try {
    const {checkin,car:licenceplate,hasLeftKeys,customprice} = req.body;
    let checkinDate: string = dayjs(checkin).format('MM-DD-YYYY');
    const todayDate: string = dayjs(new Date).format('MM-DD-YYYY');
    const car = await Car.findOne({ licenceplate, status: 1 }) as ICar;
    if (!car){
      res.status(400).json({
        ok:false,
        msg: 'El carro no existe'
      })
    }
    if (dayjs(checkinDate).diff(todayDate) < 0){
      res.status(400).json({
        ok:false,
        msg: 'Fecha de entrada debe ser mayor o igual a hoy.'
      })
    }
    const newCar = {
      checkin,
      car: car._id,
      hasLeftKeys,
      customprice: (customprice > 0) ? customprice : 0,
    };
    const newGarageCar = new GarageCar(newCar);
    await newGarageCar.save();
    return res.status(200).json({
      ok: true,
      msg: 'Carro agregado exitosamente',
      car: newGarageCar
    })
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Ocurrio un error: " + err,
    });
  }
}
const getGarageCars = async(req: CustomRequest<IGarageCar>, res: Response) => {
  try {
    const garageCars:IGarageCar[] = await GarageCar.find({ status:1 }).sort({_id:-1}).exec();
    const cars: ICar[] = await Car.find({ status:1 }).lean();
    const customers: ICustomer[] = await Customer.find({status:1}).lean();
    // console.log("cars: ",cars)
    return res.status(200).json({
      ok:true,
      cars: garageCars.map((garageCar: IGarageCar) => {
        console.log("garageCar.checkout: ",garageCar.checkout)
        return {
          id: garageCar._id,
          checkin: garageCar.checkin,
          checkout: (!garageCar.checkout) ? "" : garageCar.checkout,
          car: cars.find((car: ICar) => car._id.toString() === garageCar.car.toString()),
          customer: {
            ...cars.map((car: ICar) => {
              return customers.find((customer: ICustomer) => customer._id.toString() === car.customer.toString());
            })[0]
          },
          hasLeftKeys: garageCar.hasLeftKeys,
          hasPaid: garageCar.hasPaid,
          customprice: garageCar.customprice,
        }
      })
    })
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Ocurrio un error: " + err,
    });
  }
}
const updateGarageCar = async(req: CustomRequest<IGarageCar>, res: Response) => {

}
const deleteGarageCar = async(req: CustomRequest<IGarageCar>, res: Response) => {

}
const setCheckOutCar = async(req: CustomRequest<IGarageCar>, res: Response) => {

}
const payAllTicketsPerCustomer = async(req: CustomRequest<IGarageCar>, res: Response) => {

}
module.exports = {
  createGarageCar,
  getGarageCars,
  updateGarageCar,
  deleteGarageCar,
  setCheckOutCar,
  payAllTicketsPerCustomer
}