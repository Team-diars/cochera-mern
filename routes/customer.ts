import Router from "express";
import { check } from "express-validator";
const {
  getCustomers,
  registerCustomer,
  updateCustomer,
  deleteCustomer,
  getSingleCustomer
} = require("../controllers/customer");
const { fieldValidation } = require("../middleware/field-validation");
const { validateJWT } = require("../middleware/validate-jwt");

const router = Router();

// router.use(validateJWT);

router.get("/", getCustomers);

router.get("/:id", getSingleCustomer)

router.post(
  "/create",
  [
    check("fullname", "El nombre es requerido").not().isEmpty(),
    check("cellphone", "Ingrese un teléfono valido")
      .optional()
      .custom((val) =>
        /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g.test(val)
      ),
    fieldValidation,
  ],
  registerCustomer
);

router.put(
  "/edit",
  [check("id", "El id es requerido").not().isEmpty(), fieldValidation],
  updateCustomer
);

router.delete(
  "/delete",
  [check("id", "El id es requerido").not().isEmpty(), fieldValidation],
  deleteCustomer
);

module.exports = router;
