import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { initRouterApi } from './router/router';
import helmet from 'helmet';

dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json())
app.use('/api', initRouterApi());
app.use(helmet());


// пока без SSL
// let key = fs.readFileSync('./ssl/private.key');
// let cert = fs.readFileSync('./ssl/certificate.crt');
// let ca = fs.readFileSync('./ssl/ca_bundle.crt');
// let options = {
//   key: key,
//   cert: cert,
//   ca: ca
// };

const server = http.createServer(app);

 server.listen(port, () => {
   console.log("server starting on port : " + port)
 });
