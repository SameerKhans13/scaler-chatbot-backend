import express from 'express';
import { getPersonaReply } from '../services/gemini.js';
import { prompts } from '../prompts/index.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { personaId, message, history = [] } = req.body;

  if (!personaId || !message) {
    return res
      .status(400)
      .json({ error: 'personaId and message are required.' });
  }

  const systemPrompt = prompts[personaId];
  if (!systemPrompt) {
    return res.status(400).json({ error: 'Unknown persona.' });
  }

  // Check if using placeholder API key for demo
  console.log(`API Key check: Key exists=${!!process.env.GEMINI_API_KEY}`);
  console.log(`API Key (first 20 chars): ${process.env.GEMINI_API_KEY?.substring(0, 20)}`);
  if (
    !process.env.GEMINI_API_KEY ||
    process.env.GEMINI_API_KEY === 'test_key_placeholder'
  ) {
    const mockReplies = {
      anshuman:
        "Hey! I'm Anshuman. To chat with me, you'll need to set up a valid Gemini API key in your .env file. Visit aistudio.google.com/app/apikey to get one, then restart the server. In the meantime, here's what I'd say: Build something real, solve a real problem, and don't wait for perfect conditions. That's how we started InterviewBit.",
      abhimanyu:
        'Hi there! This is Abhimanyu. I need a real Gemini API key to respond fully. Get one at aistudio.google.com/app/apikey and update your .env file. Quick thought though: the best system design is one that solves the actual problem at hand, not the theoretical one. What specific problem are you trying to solve?',
      kshitij:
        'Hello! I\'m Kshitij. To get full responses, please add your Gemini API key to .env from aistudio.google.com/app/apikey. For now: the question you should ask yourself is "what\'s my baseline today, and what\'s my target in 6 months?" That metric-driven thinking is how we measure success at Scaler.',
    };
    return res.json({
      reply: mockReplies[personaId] || mockReplies.anshuman,
    });
  }

  try {
    const reply = await getPersonaReply(systemPrompt, history, message);
    res.json({ reply });
  } catch (err) {
    next(err);
  }
});

export default router;
