/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface MoodEntry {
  date: string;
  mood: 'happy' | 'calm' | 'neutral' | 'sad' | 'anxious';
  intensity: number;
}

export interface Habit {
  id: string;
  name: string;
  completed: boolean;
}
