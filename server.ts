import express from 'express';
import cors from 'cors';
import http from 'http';
import {connectToDB} from './config/db'
require("dotenv").config();
const app = express();

const server: http.Server = http.createServer(app);
const PORT = process.env.PORT || 8000; 

connectToDB();

server.listen(PORT, () => {
  console.log(`Server starting on port:  ${PORT}`);
})
app.use(cors());

app.use(express.json());

app.use("/api/", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/customer", require("./routes/customer"));
app.use("/api/upload", require("./routes/upload"));
app.use("/api/car", require("./routes/car"));
app.use("/api/garage", require("./routes/garage"));