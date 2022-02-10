import Router from "express";
import { check } from "express-validator";
const {
  getAllCars,
  getCars,
  getSingleCar,
  registerCar,
  updateCar,
  deleteCar,
} = require("../controllers/car");
const { fieldValidation } = require("../middleware/field-validation");
const { validateJWT } = require("../middleware/validate-jwt");
const router = Router();

// router.use(validateJWT);
router.get("/",getAllCars)
router.get("/:id",getCars);
router.get("/show/:id",getSingleCar)
router.post(
  "/create",
  [
    check("_id", "El id es requerido").not().isEmpty(),
    check("brand", "La marca es requerida").not().isEmpty(),
    check("model", "El modelo es requerido").not().isEmpty(),
    check("licenceplate", "La placa es requerida").not().isEmpty(),
    fieldValidation,
  ],
  registerCar
);
router.put(
  "/edit/:customerid",
  [
    check("_id", "El id es requerido").not().isEmpty(),
    check("brand", "La marca es requerida").not().isEmpty(),
    check("model", "El modelo es requerido").not().isEmpty(),
    check("licenceplate", "La placa es requerida").not().isEmpty(),
    fieldValidation,
  ],
  updateCar
);
router.delete(
  "/delete/:id",
  deleteCar
);

module.exports = router;
