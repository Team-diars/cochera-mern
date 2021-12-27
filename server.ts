import express from 'express';
import cors from 'cors';
import http from 'http';
import {connectToDB} from './config/db'
const app = express();

const server = http.createServer(app);
const PORT = process.env.PORT || 6000;

connectToDB();

server.listen(PORT, () => {
  console.log(`Server starting on port:  ${PORT}`);
})
app.use(cors());