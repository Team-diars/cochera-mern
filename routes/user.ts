import Router from "express";
import { check } from "express-validator";
const {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const { fieldValidation } = require("../middleware/field-validation");
const { validateJWT } = require("../middleware/validate-jwt");

const router = Router();

router.use(validateJWT);

router.get("/", getUsers);

router.post(
  "/create",
  [
    check("fullname", "El nombre es requerido").not().isEmpty(),
    check("email", "El email es requerido").not().isEmpty(),
    check("email", "Ingrese un email valido").isEmail(),
    check("password", "El password es requerido").not().isEmpty(),
    fieldValidation,
  ],
  registerUser
);

router.put(
  "/update",
  [
    check("id", "El id es requerido").not().isEmpty(),
    check("fullname", "El nombre es requerido").not().isEmpty(),
    check("email", "El email es requerido").not().isEmpty(),
    check("email", "Ingrese un email valido").isEmail(),
    fieldValidation,
  ],
  updateUser
);

router.delete(
    "/delete",
    [
      check("id", "El id es requerido").not().isEmpty(),
      fieldValidation,
    ],
    deleteUser
  );

module.exports = router;
