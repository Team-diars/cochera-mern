"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const db_1 = require("./config/db");
require("dotenv").config();
const app = express_1.default();
const server = http_1.default.createServer(app);
const PORT = process.env.PORT || 8000;
db_1.connectToDB();
server.listen(PORT, () => {
    console.log(`Server starting on port:  ${PORT}`);
});
app.use(cors_1.default());
app.use(express_1.default.json());
app.use("/api/", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/customer", require("./routes/customer"));
