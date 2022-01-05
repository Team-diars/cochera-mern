import {Request, Response} from 'express'
const Customer = require("../models/customer");

const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.find({ status: 1 }).exec();
    return res.status(200).json({
      ok: true,
      customers: customers.map((customer) => {
        return {
          id: customer._id,
          fullname: customer.fullname,
          cellphone: customer.cellphone || "",
          address: customer.address || "",
        };
      }),
    });
  } catch (err) {
    console.error(err)
  }
};

const registerCustomer = async (req: Request, res: Response) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    return res.status(200).json({
      ok: true,
      message: "Cliente registrado exitosamente",
      customer: {
        id: customer._id,
        fullname: customer.fullname,
        cellphone: customer.cellphone || "",
        address: customer.address || "",
      },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Ocurrio un error",
    });
  }
};

const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const customer = await Customer.findOne({ _id: id, status: 1 }).exec();
    if (!customer)
      return res.status(404).json({
        ok: false,
        msg: "El cliente no existe",
      });
    const newData = req.body;
    const customerUpdated = await Customer.findByIdAndUpdate(id, newData, {
      new: true,
    });
    return res.status(200).json({
      ok: true,
      message: "Cliente actualizado exitosamente",
      customer: {
        id: customerUpdated._id,
        fullname: customerUpdated.fullname,
        cellphone: customerUpdated.cellphone || "",
        address: customerUpdated.address || "",
      },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Ocurrio un error",
    });
  }
};

const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const customer = await Customer.findOne({ _id: id, status: 1 }).exec();
    if (!customer)
      return res.status(404).json({
        ok: false,
        msg: "El cliente no existe",
      });
    await Customer.findByIdAndUpdate(
      id,
      { status: 0 },
      {
        new: true,
      }
    );
    return res.status(200).json({
      ok: true,
      message: "Cliente eliminado exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Ocurrio un error",
    });
  }
};

module.exports = {
  getCustomers,
  registerCustomer,
  updateCustomer,
  deleteCustomer,
};
