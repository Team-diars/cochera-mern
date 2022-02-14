import Router from "express";
import { check } from "express-validator";
const {
  createGarageCar,
  getGarageCars
} = require("../controllers/garage");
const { fieldValidation } = require("../middleware/field-validation");
const { validateJWT } = require("../middleware/validate-jwt");
const router = Router();


router.post('/create',
  [
    check("checkin", "La entrada es requerida").not().isEmpty(),
    check("car", "La placa es requerido").not().isEmpty(),
    fieldValidation,
  ],createGarageCar);

router.get('/', getGarageCars);

module.exports = router;