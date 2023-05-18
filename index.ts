import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import https from 'https';

dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(cors());