import express from 'express';
import cors from 'cors';
import chatRouter from './routes/chat.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || '*',
    methods: ['POST'],
  })
);
app.use(express.json());

// Routes
app.use('/chat', chatRouter);

// Error handling
app.use(errorHandler);

export default app;
