"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const { getCars, registerCar, updateCar, deleteCustomer, } = require("../controllers/car");
const { fieldValidation } = require("../middleware/field-validation");
const { validateJWT } = require("../middleware/validate-jwt");
const router = (0, express_1.default)();
router.use(validateJWT);
router.post("/", [(0, express_validator_1.check)("id", "El id es requerido").not().isEmpty(), fieldValidation], getCars);
router.post("/create", [
    (0, express_validator_1.check)("id", "El id es requerido").not().isEmpty(),
    (0, express_validator_1.check)("brand", "La marca es requerida").not().isEmpty(),
    (0, express_validator_1.check)("model", "El modelo es requerido").not().isEmpty(),
    (0, express_validator_1.check)("licenceplate", "La placa es requerida").not().isEmpty(),
    fieldValidation,
], registerCar);
router.put("/edit", [
    (0, express_validator_1.check)("id", "El id es requerido").not().isEmpty(),
    (0, express_validator_1.check)("brand", "La marca es requerida").not().isEmpty(),
    (0, express_validator_1.check)("model", "El modelo es requerido").not().isEmpty(),
    (0, express_validator_1.check)("licenceplate", "La placa es requerida").not().isEmpty(),
    fieldValidation,
], updateCar);
router.delete("/delete", [(0, express_validator_1.check)("id", "El id es requerido").not().isEmpty(), fieldValidation], deleteCustomer);
module.exports = router;
