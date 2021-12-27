"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CustomerSchema = new mongoose_1.Schema({
    fullname: {
        type: String,
        required: true,
    },
    cellphone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
    },
    dni: {
        type: String,
        required: true,
    },
    cars: [
        {
            brand: String,
            model: String,
            licenceplate: String,
            color: String,
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Number,
        default: 1,
    },
});
module.exports = mongoose_1.model("customer", CustomerSchema);
