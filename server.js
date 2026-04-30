import dotenv from 'dotenv';

// Load environment variables FIRST
dotenv.config();
console.log('[DEBUG] process.env.PORT:', process.env.PORT);

// Then dynamically import app after env vars are loaded
const { default: app } = await import('./src/app.js');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API Key loaded: ${process.env.GEMINI_API_KEY ? 'YES' : 'NO'}`);
});
