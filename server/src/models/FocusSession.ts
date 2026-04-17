import mongoose, { Schema, Document } from 'mongoose';

export interface Distraction {
  appName: string;
  timeSpent: number;
}

export interface IFocusSession extends Document {
  userId: string;
  date: Date;
  focusTime: number; // in seconds
  distractionsCount: number;
  appsUsed: Distraction[];
}

const FocusSessionSchema: Schema = new Schema({
  userId: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  focusTime: { type: Number, required: true },
  distractionsCount: { type: Number, required: true, default: 0 },
  appsUsed: [
    {
      appName: { type: String, required: true },
      timeSpent: { type: Number, required: true }
    }
  ]
});

export const FocusSession = mongoose.model<IFocusSession>('FocusSession', FocusSessionSchema);
