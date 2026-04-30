import express from 'express';
import cors from 'cors';
import chatRouter from './routes/chat.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middleware - Support multiple origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://scaler-chatbot-frontend.vercel.app',
  process.env.ALLOWED_ORIGIN
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.use('/chat', chatRouter);

// Error handling
app.use(errorHandler);

export default app;
