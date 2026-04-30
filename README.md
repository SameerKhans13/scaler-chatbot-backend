# Scaler Persona Chatbot — Backend

Node.js + Express server for the Scaler Persona Chatbot. Serves AI-powered responses using Google Gemini, styled as three distinct personas.

## Features

- **Three Persona Prompts**: Anshuman Singh, Abhimanyu Saxena, Kshitij Mishra
- **Gemini Integration**: Fast, accurate AI responses with system prompts
- **Conversation History**: Maintains multi-turn context
- **CORS Enabled**: Secure cross-origin requests
- **Error Handling**: Graceful error responses
- **Production Ready**: Deploys to Railway

## Tech Stack

- Node.js 18+
- Express.js
- Google Generative AI (Gemini)
- dotenv for env management
- CORS middleware

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/scaler/scaler-chatbot-backend.git
   cd scaler-chatbot-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Get your Gemini API key:
   - Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create an API key
   - Paste it in `.env` as `GEMINI_API_KEY`

5. Set environment variables:
   ```
   GEMINI_API_KEY=your_key_here
   ALLOWED_ORIGIN=http://localhost:5173
   PORT=3001
   NODE_ENV=development
   ```

6. Start dev server:
   ```bash
   npm run dev
   ```

7. Server runs on [http://localhost:3001](http://localhost:3001)

## API Endpoints

### `POST /chat`

Send a message to a persona.

**Request:**
```json
{
  "personaId": "anshuman",
  "message": "How did you build InterviewBit?",
  "history": [
    { "role": "user", "parts": [{ "text": "..." }] },
    { "role": "model", "parts": [{ "text": "..." }] }
  ]
}
```

**Response (200):**
```json
{
  "reply": "Great question! InterviewBit actually started as..."
}
```

**Response (400):**
```json
{
  "error": "personaId and message are required."
}
```

**Response (500):**
```json
{
  "error": "Something went wrong. Please try again."
}
```

## Personas

Each persona has a unique system prompt with specific communication style and constraints:

### Anshuman Singh
- Co-founder, direct and outcome-focused
- Uses specific numbers and timelines
- Occasionally uses Hindi naturally
- Ends with a challenge or question

### Abhimanyu Saxena
- Ex-Facebook engineer, measured and thoughtful
- Thinks in tradeoffs and first principles
- Uses engineering analogies
- Warmer than Anshuman

### Kshitij Mishra
- CEO, operationally-minded
- Data-driven about outcomes
- Speaks from employer perspective
- Honest about limitations

See [prompts.md](./prompts.md) for full prompt details.

## Project Structure

```
src/
├── routes/
│   └── chat.js              # POST /chat endpoint
├── services/
│   └── gemini.js            # Gemini API wrapper
├── middleware/
│   └── errorHandler.js      # Global error handler
├── prompts/
│   ├── anshuman.js
│   ├── abhimanyu.js
│   ├── kshitij.js
│   └── index.js             # Prompt registry
└── app.js                   # Express setup
server.js                   # Entry point
```

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `GEMINI_API_KEY` | Google Gemini API key | ✓ |
| `ALLOWED_ORIGIN` | Frontend URL (for CORS) | ✗ (defaults to `*`) |
| `PORT` | Server port | ✗ (defaults to 3001) |
| `NODE_ENV` | Environment | ✗ (defaults to development) |

## Deployment

### Railway (Recommended)

1. Push code to GitHub
2. Go to [railway.app](https://railway.app)
3. Create new project → Import from GitHub
4. Select the repository
5. Add environment variables:
   - `GEMINI_API_KEY` → your API key
   - `ALLOWED_ORIGIN` → your Vercel frontend URL
   - `NODE_ENV` → production
6. Deploy

Railway auto-assigns a `PORT` via environment variables.

### Render

1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Create new Web Service
4. Connect GitHub repo
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Add environment variables (same as above)
8. Deploy

## Development

- **Dev server**: `npm run dev` (with file watching)
- **Start**: `npm start` (production mode)

## Testing the API

Using curl:

```bash
curl -X POST http://localhost:3001/chat \
  -H "Content-Type: application/json" \
  -d '{
    "personaId": "anshuman",
    "message": "How did you build InterviewBit?",
    "history": []
  }'
```

## Error Handling

All errors return a JSON response with a descriptive message. The frontend displays these gracefully.

## Rate Limiting

Currently no rate limiting. Consider adding in production via middleware like `express-rate-limit`.

## Security

- CORS is restricted to `ALLOWED_ORIGIN` (set in .env)
- API keys are never exposed to frontend (stored server-side only)
- Input validation on personaId and message

## License

MIT
