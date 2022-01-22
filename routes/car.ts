import Router from "express";
import { check } from "express-validator";
const {
  getCars,
  registerCar,
  updateCar,
  deleteCustomer,
} = require("../controllers/car");
const { fieldValidation } = require("../middleware/field-validation");
const { validateJWT } = require("../middleware/validate-jwt");

const router = Router();

// router.use(validateJWT);

router.get(
  "/:id",
  getCars
);

router.post(
  "/create",
  [
    check("id", "El id es requerido").not().isEmpty(),
    check("brand", "La marca es requerida").not().isEmpty(),
    check("model", "El modelo es requerido").not().isEmpty(),
    check("licenceplate", "La placa es requerida").not().isEmpty(),
    fieldValidation,
  ],
  registerCar
);

router.put(
  "/edit",
  [
    check("id", "El id es requerido").not().isEmpty(),
    check("brand", "La marca es requerida").not().isEmpty(),
    check("model", "El modelo es requerido").not().isEmpty(),
    check("licenceplate", "La placa es requerida").not().isEmpty(),
    fieldValidation,
  ],
  updateCar
);

// router.delete(
//   "/delete",
//   [check("id", "El id es requerido").not().isEmpty(), fieldValidation],
//   deleteCustomer
// );

module.exports = router;
