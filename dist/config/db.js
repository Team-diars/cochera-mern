"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const db = config_1.default.get("mongoURI");
const connectToDB = async () => {
    try {
        const obj = {
            bufferCommands: false,
            dbName: "test",
            user: "root",
            pass: "root",
            autoIndex: false,
            autoCreate: true,
        };
        await mongoose_1.default.connect(db, obj, (error) => {
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
exports.connectToDB = connectToDB;
//module.exports = connectToDB;
