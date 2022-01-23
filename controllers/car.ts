import { Request, Response } from 'express';
import {Car, Customer, Customer as CustomerInterface, CustomRequest} from '../types/customer'
const Customer = require("../models/customer");

const getCars = async (req: CustomRequest<Car>, res: Response) => {
  const { id } = req.params;
  const customer = await Customer.findOne({ _id: id, status: 1 }).exec();
  if (!customer){
    return res.status(404).json({
      ok: false,
      msg: "El cliente no existe",
    });
  }
  return res.status(200).json({
    ok: true,
    cars: customer.cars
  });
};

const getSingleCar = async(req: CustomRequest<Car>, res: Response) => {
  const { id } = req.params;
  const customer = await Customer.findOne({ "cars._id": id }).exec() as Customer;
  if (!customer){
    return res.status(404).json({
      ok: false,
      msg: "El auto no existe",
    });
  }
  return res.status(200).json({
    ok: true,
    car: customer.cars.find((car: Car) => car.id === id)
  });
}

const registerCar = async (req: CustomRequest<Car>, res: Response) => {
  try {
    const { id, licenceplate } = req.body;
    const customer = await Customer.findOne({ _id: id, status: 1 }).exec();
    if (!customer)
      return res.status(404).json({
        ok: false,
        msg: "El cliente no existe",
      });
    const isPlateRegistered = await Customer.findOne({
      "cars.licenceplate": licenceplate,
    }).exec();
    if (isPlateRegistered)
      return res.status(400).json({
        ok: false,
        msg: "El carro ya se encuentra registrado",
      });
    customer.cars.push(req.body);
    const customerUpdated = await customer.save();
    const newCar = customerUpdated.cars.find((car: Car) => {
      return car.licenceplate == licenceplate;
    });
    return res.status(200).json({
      ok: true,
      message: "Carro registrado exitosamente",
      car: {
        id: newCar._id,
        brand: newCar.brand,
        model: newCar.model,
        licenceplate: newCar.licenceplate,
        color: newCar.color,
        image: newCar.image,
      },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Ocurrio un error" + error,
    });
  }
};

const updateCar = async (req: CustomRequest<Car>, res: Response) => {
  try {
    const { id, licenceplate,color, brand, model } = req.body;
    const {customerid} = req.params;
    await Customer.findOne({ "_id": customerid }, (err: Error, values: Customer) => {
      const cars = values.cars;
      console.log("cars: ",cars)
      // await Customer.update({'cars._id': id}, {'$set':{
      //   'cars.$.brand':brand,
      //   'cars.$.model':model,
      //   'cars.$.color':color,
      //   'cars.$.licenceplate':licenceplate,
      // }}, function(err: Error){
      //   return res.status(500).json({
      //           ok: false,
      //           msg: err,
      //         });
      // })
    }).exec();
    // if (!customer)
    //   return res.status(404).json({
    //     ok: false,
    //     msg: "El carro no existe",
    //   });
    // const isPlateRegistered = await Customer.findOne({"cars.licenceplate": licenceplate}).exec();
    // if (isPlateRegistered) {
    //   const car = isPlateRegistered.cars.find((car) => {
    //     return car.licenceplate == licenceplate;
    //   });
    //   if (car._id != id)
    //     return res.status(404).json({
    //       ok: false,
    //       msg: "La placa ya está registrada",
    //     });
    // }
    // const car = await customer.cars.id(id);
    // car.brand = req.body.brand || null;
    // car.model = req.body.model || null;
    // car.licenceplate = req.body.licenceplate || null;
    // car.color = req.body.color || null;
    // await car.save();
    // return res.status(200).json({
    //   ok: true,
    //   msg: "Carro actualizado exitosamente",
    //   car,
    // });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Ocurrio un error" + error,
    });
  }
};
const deleteCar = async(req: CustomRequest<Car>, res: Response) => {
  try {
    const { id } = req.params;
    const car = await Customer.findOne({ "cars._id": id }).exec();
    if (!car){
      return res.status(404).json({
        ok: false,
        msg: "El auto no existe",
      });
    }
    await Customer.deleteOne({
      "cars._id": id,
    }).exec();
    return res.status(200).json({
      ok: true,
      message: "Auto eliminado exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Ocurrio un error",
    });
  }
}
module.exports = {
  getCars,
  registerCar,
  updateCar,
  deleteCar,
  getSingleCar
};
