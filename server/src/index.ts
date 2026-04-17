import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import focusRoutes from './routes/focusRoutes';
import aiRoutes from './routes/aiRoutes';~

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/focusApp')
  .then(() => console.log('MongoDB Hooked Up'))
  .catch(err => console.error('MongoDB Error:', err));

// Routes
app.use('/api/focus', focusRoutes);
app.use('/api/ai', aiRoutes);

// Basic route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Focus server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
