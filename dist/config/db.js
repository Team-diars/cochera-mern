"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const db = config_1.default.get("mongoURI");
exports.connectToDB = async () => {
    try {
        await mongoose_1.default.connect(db, {
            bufferCommands: false,
            autoIndex: false,
            autoCreate: true,
        }, (error) => {
            if (error) {
                console.log(error);
            }
        });
        console.log('Mongo connected!');
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};
