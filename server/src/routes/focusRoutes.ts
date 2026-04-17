import { Router } from 'express';
import { FocusSession } from '../models/FocusSession';

const router = Router();

router.post('/analytics', async (req, res) => {
  try {
    const { userId, focusTime, distractionsCount, appsUsed } = req.body;
    const session = new FocusSession({
      userId,
      focusTime,
      distractionsCount,
      appsUsed
    });
    await session.save();
    res.status(201).json(session);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/analytics/:userId', async (req, res) => {
  try {
    const sessions = await FocusSession.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(sessions);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
