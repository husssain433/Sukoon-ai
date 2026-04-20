import { motion } from 'motion/react';
import { Quote, ArrowRight, Heart, Smile, Meh, Frown, AlertCircle, CheckCircle2, Moon, Sparkles, Sun } from 'lucide-react';
import React, { useState } from 'react';

export default function Dashboard({ userName }: { userName: string }) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const moods = [
    { icon: <Smile className="w-8 h-8" />, label: 'Great', color: 'bg-green-100 text-green-600', id: 'happy' },
    { icon: <Heart className="w-8 h-8" />, label: 'Calm', color: 'bg-blue-100 text-blue-600', id: 'calm' },
    { icon: <Meh className="w-8 h-8" />, label: 'Okay', color: 'bg-yellow-100 text-yellow-600', id: 'neutral' },
    { icon: <Frown className="w-8 h-8" />, label: 'Low', color: 'bg-orange-100 text-orange-600', id: 'sad' },
    { icon: <AlertCircle className="w-8 h-8" />, label: 'Anxious', color: 'bg-red-100 text-red-600', id: 'anxious' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-widest text-sakoon-teal/40 mb-1">Assalam-o-Alaikum</h2>
        <div className="flex items-baseline gap-2">
          <h1 className="text-3xl font-display font-bold text-sakoon-teal">Hello, {userName}</h1>
        </div>
        <p className="text-sakoon-teal/60 mt-2">How are you feeling at this moment?</p>
      </section>

      {/* Mood Selector */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-sakoon-teal/5">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg">Daily Check-in</h3>
          <span className="text-xs font-bold text-sakoon-teal/40 uppercase">Day 5 of habit</span>
        </div>
        <div className="flex justify-between gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(mood.id)}
              className={`flex flex-col items-center gap-2 min-w-[70px] p-3 rounded-2xl transition-all duration-300 ${
                selectedMood === mood.id 
                  ? `${mood.color} ring-2 ring-offset-2 ring-sakoon-teal/10 scale-105 shadow-md` 
                  : 'bg-sakoon-cream/50 text-sakoon-teal/40 hover:bg-sakoon-teal/5'
              }`}
            >
              {mood.icon}
              <span className="text-xs font-bold tracking-tight">{mood.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Quote Card */}
      <section className="relative overflow-hidden bg-sakoon-teal text-sakoon-cream rounded-3xl p-8 shadow-xl">
        <Quote className="absolute -top-4 -left-4 w-24 h-24 text-sakoon-cream/10 rotate-12" />
        <div className="relative z-10">
          <p className="text-xl font-display font-medium leading-relaxed italic mb-4">
            "Sabar (Patience) is not just waiting; it's the quality of our attitude while waiting."
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-sakoon-cream/60">— Wisdom from the East</span>
            <button className="p-2 bg-sakoon-cream/10 rounded-full hover:bg-sakoon-cream/20 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Daily Rituals */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg text-sakoon-teal">Daily Rituals</h3>
          <button className="text-xs font-bold text-sakoon-clay uppercase underline decoration-2 underline-offset-4">Edit All</button>
        </div>
        <div className="grid gap-3">
          <HabitItem title="Morning Dhikr / Meditation" icon={<Sun className="w-4 h-4" />} completed={true} />
          <HabitItem title="Gratitude Journaling" icon={<Heart className="w-4 h-4" />} completed={false} />
          <HabitItem title="Evening Wind-down" icon={<Moon className="w-4 h-4" />} completed={false} />
        </div>
      </section>

      {/* Wellness Insight */}
      <section className="bg-sakoon-sage/10 rounded-3xl p-6 border border-sakoon-sage/20">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sakoon-sage flex items-center justify-center text-white shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sakoon-teal">AI Wellness Insight</h4>
            <p className="text-sm text-sakoon-teal/70 mt-1 leading-relaxed">
              Based on your streak, you're 40% more consistent this week. Your morning meditation is becoming a strong anchor for your focus.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function HabitItem({ title, icon, completed }: { title: string, icon: React.ReactNode, completed: boolean }) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
      completed ? 'bg-sakoon-teal/5 border-sakoon-teal/10 opacity-60' : 'bg-white border-sakoon-teal/5 shadow-sm'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          completed ? 'bg-sakoon-teal text-sakoon-cream' : 'bg-sakoon-cream text-sakoon-teal'
        }`}>
          {icon}
        </div>
        <span className={`font-medium ${completed ? 'line-through text-sakoon-teal/40' : 'text-sakoon-teal'}`}>{title}</span>
      </div>
      {completed ? (
        <CheckCircle2 className="w-5 h-5 text-sakoon-teal" />
      ) : (
        <div className="w-5 h-5 rounded-full border-2 border-sakoon-teal/20" />
      )}
    </div>
  );
}
