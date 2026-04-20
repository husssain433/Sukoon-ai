import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  MessageCircle, 
  Brain, 
  Sparkles, 
  User, 
  Moon, 
  Sun,
  LayoutDashboard,
  Bell,
  Search,
  Quote,
  Flame,
  ArrowRight
} from 'lucide-react';
import { Message, Habit, MoodEntry } from './types';
import ChatInterface from './components/ChatInterface';
import Dashboard from './components/Dashboard';
import Mindfulness from './components/Mindfulness';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'chat' | 'wellness' | 'profile'>('home');
  const [streak, setStreak] = useState(5);
  const [userName, setUserName] = useState('Humraaz'); // Default demo name

  return (
    <div className="min-h-screen bg-sakoon-cream selection:bg-sakoon-clay selection:text-white overflow-x-hidden">
      {/* Background grain/texture effect */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/sandpaper.png')]"></div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-sakoon-cream/80 backdrop-blur-md border-b border-sakoon-teal/5">
        <div className="max-w-xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-sakoon-teal flex items-center justify-center text-sakoon-cream">
              <Sparkles className="w-4 h-4" />
            </div>
            <h1 className="font-display font-bold text-xl tracking-tight text-sakoon-teal">Sakoon</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-sakoon-clay/10 px-2 py-1 rounded-full">
              <Flame className="w-4 h-4 text-sakoon-clay" />
              <span className="text-sm font-bold text-sakoon-clay">{streak}</span>
            </div>
            <button className="relative p-2 rounded-full hover:bg-sakoon-teal/5 transition-colors">
              <Bell className="w-5 h-5 text-sakoon-teal" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-sakoon-clay rounded-full border-2 border-sakoon-cream"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-20 pb-28 max-w-xl mx-auto px-6 min-h-[calc(100vh-4rem)]">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Dashboard userName={userName} />
            </motion.div>
          )}

          {activeTab === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-[calc(100vh-14rem)]"
            >
              <ChatInterface />
            </motion.div>
          )}

          {activeTab === 'wellness' && (
            <motion.div
              key="wellness"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Mindfulness />
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center pt-10 text-center"
            >
              <div className="w-24 h-24 rounded-full bg-sakoon-teal/10 flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-sakoon-teal" />
              </div>
              <h2 className="text-2xl font-display font-bold">Your Profile</h2>
              <p className="text-sakoon-teal/60 mb-8 max-w-sm">Settings and journey history coming soon. We're crafting a personalized space for your growth.</p>
              <button 
                className="w-full max-w-xs bg-sakoon-teal text-sakoon-cream py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all shadow-lg active:scale-95"
                onClick={() => setActiveTab('home')}
              >
                Back to Dashboard <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-6 left-6 right-6 z-50 max-w-xl mx-auto">
        <div className="bg-sakoon-teal rounded-3xl shadow-2xl p-2 flex items-center justify-around">
          <NavButton 
            active={activeTab === 'home'} 
            onClick={() => setActiveTab('home')} 
            icon={<LayoutDashboard />} 
            label="Home" 
          />
          <NavButton 
            active={activeTab === 'chat'} 
            onClick={() => setActiveTab('chat')} 
            icon={<MessageCircle />} 
            label="Companion" 
          />
          <NavButton 
            active={activeTab === 'wellness'} 
            onClick={() => setActiveTab('wellness')} 
            icon={<Brain />} 
            label="Wellness" 
          />
          <NavButton 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')} 
            icon={<User />} 
            label="Me" 
          />
        </div>
      </nav>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center gap-1 py-1 px-4 sm:px-6 rounded-2xl transition-all duration-300 ${
        active ? 'text-sakoon-teal' : 'text-sakoon-cream/60 hover:text-sakoon-cream'
      }`}
    >
      {active && (
        <motion.div
          layoutId="nav-pill"
          className="absolute inset-0 bg-sakoon-cream rounded-2xl -z-10"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <div className="scale-90">{icon}</div>
      <span className={`text-[10px] font-bold uppercase tracking-wider ${active ? 'opacity-100' : 'opacity-0 h-auto'}`}>{label}</span>
      {!active && <div className="h-[12px]" />} {/* Spacer to prevent layout shift */}
    </button>
  );
}
