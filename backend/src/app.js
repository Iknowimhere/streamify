import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
connectDB();

let app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);

export default app;
