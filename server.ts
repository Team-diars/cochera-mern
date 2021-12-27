import express from 'express';
import cors from 'cors';
import http from 'http';
const app = express();
import {connectToDB} from './config/db'

const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

connectToDB();

server.listen(PORT, () => {
  console.log(`Server starting on port:  ${PORT}`);
})
app.use(cors());
app.listen(3000);