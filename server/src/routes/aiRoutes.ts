import { Router } from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FocusSession } from '../models/FocusSession';

const router = Router();
// // const apiKey = process.env.GEMINI_API_KEY;

// // if (!apiKey) {
// //   throw new Error("GEMINI_API_KEY is missing");
// // }

// const ai = new GoogleGenerativeAI( "");

// router.post('/insights/:userId', async (req, res) => {
//   try {
//     const sessions = await FocusSession.find({ userId: req.params.userId }).sort({ date: -1 }).limit(7);
    
//     // Prepare prompt payload with user's last 7 sessions
//     const sessionData = sessions.map(s => ({
//       date: s.date,
//       focusTimeMins: Math.round(s.focusTime / 60),
//       distractionsCount: s.distractionsCount,
//       appsUsed: s.appsUsed
//     }));

//     const prompt = `Analyze this user's focus patterns for the past week:
// ${JSON.stringify(sessionData, null, 2)}
// Identify:
// 1. Best time for focused work
// 2. "Low productivity days"
// 3. Provide a smart and encouraging nudge (e.g. "Instagram usage spikes after 8 PM")
// Respond in a short, easily readable format for an app dashboard.`;

//     const response = await ai.models.generateContent({
//         model: 'gemini-2.5-flash',
//         contents: prompt
//     });

//     res.json({ insights: response.text });
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// });

export default router;
