import Router from "express";
import { check } from "express-validator";
const {
  createGarageCar
} = require("../controllers/garage");
const { fieldValidation } = require("../middleware/field-validation");
const { validateJWT } = require("../middleware/validate-jwt");
const router = Router();


router.get('/create', createGarageCar)