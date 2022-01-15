export {};

const Customer = require("../models/customer");

const getCars = async (req, res) => {
  const { id } = req.body;
  const customer = await Customer.findOne({ _id: id, status: 1 }).exec();
  if (!customer)
    return res.status(404).json({
      ok: false,
      msg: "El cliente no existe",
    });
  return res.status(200).json({
    ok: true,
    cars: customer.cars,
  });
};

const registerCar = async (req, res) => {
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
    const newCar = customerUpdated.cars.find((car) => {
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

const updateCar = async (req, res) => {
  try {
    const { id, licenceplate } = req.body;
    let customer = await Customer.findOne({
      "cars._id": id,
    }).exec();
    if (!customer)
      return res.status(404).json({
        ok: false,
        msg: "El carro no existe",
      });
    const isPlateRegistered = await Customer.findOne({
      "cars.licenceplate": licenceplate,
    }).exec();
    if (isPlateRegistered) {
      const car = isPlateRegistered.cars.find((car) => {
        return car.licenceplate == licenceplate;
      });
      if (car._id != id)
        return res.status(404).json({
          ok: false,
          msg: "La placa ya está registrada",
        });
    }
    const car = await customer.cars.id(id);
    car.brand = req.body.brand || null;
    car.model = req.body.model || null;
    car.licenceplate = req.body.licenceplate || null;
    car.color = req.body.color || null;
    await car.save();
    return res.status(200).json({
      ok: true,
      msg: "Carro actualizado exitosamente",
      car,
    });
    /* const newData = req.body;
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
    }); */
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Ocurrio un error" + error,
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
  getCars,
  registerCar,
  updateCar,
  deleteCustomer,
};
