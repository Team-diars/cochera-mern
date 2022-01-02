"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const { getUsers, registerUser, updateUser, deleteUser, } = require("../controllers/user");
const { fieldValidation } = require("../middleware/field-validation");
const { validateJWT } = require("../middleware/validate-jwt");
const router = express_1.default();
router.use(validateJWT);
router.get("/", getUsers);
router.post("/create", [
    express_validator_1.check("fullname", "El nombre es requerido").not().isEmpty(),
    express_validator_1.check("email", "El email es requerido").not().isEmpty(),
    express_validator_1.check("email", "Ingrese un email valido").isEmail(),
    express_validator_1.check("password", "El password es requerido").not().isEmpty(),
    fieldValidation,
], registerUser);
router.put("/update", [
    express_validator_1.check("id", "El id es requerido").not().isEmpty(),
    express_validator_1.check("fullname", "El nombre es requerido").not().isEmpty(),
    express_validator_1.check("email", "El email es requerido").not().isEmpty(),
    express_validator_1.check("email", "Ingrese un email valido").isEmail(),
    fieldValidation,
], updateUser);
router.delete("/delete", [
    express_validator_1.check("id", "El id es requerido").not().isEmpty(),
    fieldValidation,
], deleteUser);
module.exports = router;
