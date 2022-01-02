import Router from "express";
import { check } from "express-validator";
const { login, renewToken } = require("../controllers/auth");

const { fieldValidation } = require("../middleware/field-validation");
const { validateJWT } = require("../middleware/validate-jwt");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El email es requerido").not().isEmpty(),
    check("email", "Ingrese un email valido").isEmail(),
    check("password", "El password es requerido").not().isEmpty(),
    fieldValidation,
  ],
  login
);

router.post("/renew", validateJWT, renewToken);

module.exports = router;
