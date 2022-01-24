import { Request, Response } from "express";
import { Car as ICar, Customer, CustomRequest } from "../types/customer";
const Car = require("../models/car");
const Customer = require("../models/customer");

const getCars = async (req: CustomRequest<ICar>, res: Response) => {
  const { id } = req.params;
  const customer = await Customer.findOne({ _id: id, status: 1 });
  if (!customer) {
    return res.status(404).json({
      ok: false,
      msg: "El cliente no existe",
    });
  }
  const cars = await Car.find({ customer: customer.id, status: 1 });
  return res.status(200).json({
    ok: true,
    cars: cars,
    any:"2131"
  });
};

const getSingleCar = async (req: CustomRequest<ICar>, res: Response) => {
  const { id } = req.params;
  const car = await Car.findOne({ _id: id, status: 1 }) as ICar;
  if (!car) {
    return res.status(404).json({
      ok: false,
      msg: "El auto no existe",
    });
  }
  return res.status(200).json({
    ok: true,
    car: car,
  });
};

const registerCar = async (req: CustomRequest<ICar>, res: Response) => {
  try {
    const { _id, licenceplate, brand, model, color, image } = req.body;
    const customer = await Customer.findOne({ _id, status: 1 });
    if (!customer)
      return res.status(404).json({
        ok: false,
        msg: "El cliente no existe",
      });
    const isPlateRegistered = await Car.findOne({
      licenceplate: licenceplate,
      status: 1,
    });
    if (isPlateRegistered){
      return res.status(400).json({
        ok: false,
        msg: "El carro ya se encuentra registrado",
      });
    }
    const data = {
      licenceplate,
      brand,
      model,
      color,
      image,
      customer: customer,
    };
    const newCar = new Car(data);
    await newCar.save();
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
        customer: newCar.customer,
      },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Ocurrio un error" + error,
    });
  }
};

const updateCar = async (req: CustomRequest<ICar>, res: Response) => {
  try {
    const { _id, licenceplate, color, brand, model, image } = req.body;
    const { customerid } = req.params;
    const customer = await Customer.findOne({ _id: customerid, status: 1 });
    if (!customer)
      return res.status(404).json({
        ok: false,
        msg: "El cliente no existe",
      });
    const car = await Car.findOne({ _id: _id, status: 1 });
    if (!car)
      return res.status(404).json({
        ok: false,
        msg: "El carro no existe",
      });
    const isPlateRegistered = await Car.findOne({
      licenceplate: licenceplate,
      status: 1,
      _id: { $ne: car._id },
    });
    if (isPlateRegistered)
      return res.status(404).json({
        ok: false,
        msg: "La placa ya está registrada",
      });
    car.brand = brand;
    car.model = model;
    car.licenceplate = licenceplate;
    car.color = color;
    car.image = image;
    await car.save();
    return res.status(200).json({
      ok: true,
      msg: "Carro actualizado exitosamente",
      car: car,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Ocurrio un error" + error,
    });
  }
};
const deleteCar = async (req: CustomRequest<ICar>, res: Response) => {
  try {
    const { id } = req.params;
    const car = await Car.findOne({ _id: id, status: 1 });
    if (!car) {
      return res.status(404).json({
        ok: false,
        msg: "El auto no existe",
      });
    }
    car.status = 0;
    await car.save();
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
};
module.exports = {
  getCars,
  registerCar,
  updateCar,
  deleteCar,
  getSingleCar,
};
