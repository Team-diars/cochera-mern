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
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    cars: [
        {
            brand: String,
            model: String,
            licenceplate: String,
            color: String,
            image: [
                String
            ]
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
