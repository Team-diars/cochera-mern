"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const { getCustomers, registerCustomer, updateCustomer, deleteCustomer, } = require("../controllers/customer");
const { fieldValidation } = require("../middleware/field-validation");
const { validateJWT } = require("../middleware/validate-jwt");
const router = express_1.default();
router.use(validateJWT);
router.get("/", getCustomers);
router.post("/create", [
    express_validator_1.check("fullname", "El nombre es requerido").not().isEmpty(),
    express_validator_1.check("cellphone", "Ingrese un teléfono valido")
        .optional()
        .custom((val) => /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g.test(val)),
    fieldValidation,
], registerCustomer);
router.put("/edit", [express_validator_1.check("id", "El id es requerido").not().isEmpty(), fieldValidation], updateCustomer);
router.delete("/delete", [express_validator_1.check("id", "El id es requerido").not().isEmpty(), fieldValidation], deleteCustomer);
module.exports = router;
