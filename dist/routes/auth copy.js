"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const { login } = require("../controllers/auth");
const { fieldValidation } = require("../middleware/field-validation");
const router = (0, express_1.default)();
router.post("/login", [
    (0, express_validator_1.check)("email", "El email es requerido").not().isEmpty(),
    (0, express_validator_1.check)("email", "Ingrese un email valido").isEmail(),
    (0, express_validator_1.check)("password", "El password es requerido").not().isEmpty(),
    fieldValidation,
], login);
module.exports = router;
