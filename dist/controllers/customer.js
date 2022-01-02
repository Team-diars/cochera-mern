"use strict";
const Customer = require("../models/customer");
const getCustomers = async (req, res) => {
    const customers = await Customer.find({ status: 1 });
    return res.status(200).json({
        ok: true,
        customers,
    });
};
const registerCustomer = async (req, res) => {
    try {
        const customer = new Customer(req.body);
        await customer.save();
        return res.status(200).json({
            ok: true,
            message: "Cliente registrado exitosamente",
            customer: {
                fullname: customer.fullname,
                cellphone: customer.cellphone,
                address: customer.address,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Ocurrio un error",
        });
    }
};
const updateCustomer = async (req, res) => {
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
                fullname: customerUpdated.fullname,
                cellphone: customerUpdated.cellphone,
                address: customerUpdated.address,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Ocurrio un error",
        });
    }
};
const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.body;
        const customer = await Customer.findOne({ _id: id, status: 1 }).exec();
        if (!customer)
            return res.status(404).json({
                ok: false,
                msg: "El cliente no existe",
            });
        await Customer.findByIdAndUpdate(id, { status: 0 }, {
            new: true,
        });
        return res.status(200).json({
            ok: true,
            message: "Cliente eliminado exitosamente",
        });
    }
    catch (error) {
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
