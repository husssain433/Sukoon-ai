import { motion } from 'motion/react';
import { Play, Clock, Heart, Headphones, Search, Filter } from 'lucide-react';
import { useState } from 'react';

const SESSIONS = [
  { id: 1, title: 'Morning Dhikr (Remembrance)', duration: '10 min', type: 'Islamic', category: 'Morning', image: 'https://picsum.photos/seed/morning/400/300' },
  { id: 2, title: 'Breath Awareness', duration: '5 min', type: 'Secular', category: 'Stress', image: 'https://picsum.photos/seed/breath/400/300' },
  { id: 3, title: 'Tafakkur (Reflection)', duration: '15 min', type: 'Islamic', category: 'Wisdom', image: 'https://picsum.photos/seed/wisdom/400/300' },
  { id: 4, title: 'Anxiety Release', duration: '8 min', type: 'Secular', category: 'Anxiety', image: 'https://picsum.photos/seed/anxiety/400/300' },
  { id: 5, title: 'Gratitude (Shukr)', duration: '12 min', type: 'Islamic', category: 'Evening', image: 'https://picsum.photos/seed/grateful/400/300' },
];

export default function Mindfulness() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredSessions = activeFilter === 'All' 
    ? SESSIONS 
    : SESSIONS.filter(s => s.type === activeFilter);

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <section>
        <h1 className="text-3xl font-display font-bold text-sakoon-teal">Mindfulness</h1>
        <p className="text-sakoon-teal/60 mt-2">Find your moment of Sakoon through guided practices.</p>
      </section>

      {/* Search & Filter */}
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sakoon-teal/40" />
          <input 
            type="text" 
            placeholder="Search sessions..." 
            className="w-full bg-white border border-sakoon-teal/5 py-3 pl-10 pr-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sakoon-teal/10"
          />
        </div>
        <button className="p-3 bg-white border border-sakoon-teal/5 rounded-2xl hover:bg-sakoon-teal/5">
          <Filter className="w-5 h-5 text-sakoon-teal" />
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        {['All', 'Islamic', 'Secular'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
              activeFilter === filter 
                ? 'bg-sakoon-teal text-sakoon-cream' 
                : 'bg-white text-sakoon-teal border border-sakoon-teal/5 hover:bg-sakoon-teal/5'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Featured Section */}
      <section>
        <h3 className="font-bold text-lg mb-4">Recommended for You</h3>
        <div className="grid gap-6">
          {filteredSessions.map((session) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              key={session.id}
              className="group relative overflow-hidden bg-white rounded-3xl border border-sakoon-teal/5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex p-4 gap-4">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                  <img 
                    src={session.image} 
                    alt={session.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-sakoon-teal/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        session.type === 'Islamic' ? 'bg-sakoon-clay/10 text-sakoon-clay' : 'bg-sakoon-sage/10 text-sakoon-sage'
                      }`}>
                        {session.type}
                      </span>
                    </div>
                    <h4 className="font-bold text-sakoon-teal leading-tight">{session.title}</h4>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 text-xs text-sakoon-teal/40 font-bold">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {session.duration}</span>
                      <span className="flex items-center gap-1"><Headphones className="w-3 h-3" /> Guided</span>
                    </div>
                    <button className="text-sakoon-teal/40 hover:text-sakoon-clay transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Emergency Section */}
      <section className="bg-red-50 border border-red-100 rounded-3xl p-6 mt-10">
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white shrink-0 mt-1">
            <span className="font-bold">!</span>
          </div>
          <div>
            <h4 className="font-bold text-red-900">Feeling Overwhelmed?</h4>
            <p className="text-sm text-red-700/80 mt-1">
              If you are in immediate distress, please reach out to a professional helpline. You are not alone.
            </p>
            <button className="mt-4 px-6 py-2 bg-red-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-red-200">
              Emergency Contacts
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
