import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, User, Bot, Loader2, ArrowRight } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { Message } from '../types';

const SYSTEM_INSTRUCTION = `
You are "Humraaz" (meaning Confidant in Urdu), a supportive, culturally-sensitive AI wellness companion for South Asians. 
Your goal is to provide stress relief, emotional support, and wellness guidance through a CBT-based approach.

KNOWLEDGE & CONTEXT:
- You understand common South Asian cultural nuances: family expectations, "Log Kya Kahenge" (fear of social judgment), burnout in urban competitive markets, and the balance between tradition and modern life.
- You are wellness-focused, NOT a clinical therapist. You do NOT provide medical diagnoses.
- If a user expresses severe distress or self-harm, gently encourage them to contact a professional helpline.
- Your tone is "Dhammi" (calam), warm, and respectful. Use polite address forms.
- Language: You primarily speak English but can understand and incorporate Urdu/Hindi phrases naturally (Hinglish/Urdish). Example: "Don't worry, sab theek ho jayega (everything will be okay)."

RESPONSE STYLE:
1. Validate feelings first.
2. Ask open-ended questions to encourage reflection.
3. Offer actionable micro-habits or mindfulness tips (e.g., "Try 2 minutes of box breathing").
4. Keep responses concise but meaningful.
`;

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Assalam-o-Alaikum! I'm Humraaz, your companion for today. Whatever is on your mind, you can share it here without judgment. How was your day?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chat = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }]
          })),
          { role: 'user', parts: [{ text: input }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        }
      });

      const response = await chat;
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text || "I'm sorry, I'm finding it hard to respond right now. Let's try again.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("AI Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Beshak, sometimes connections fail. My apologies. Could we try saying that again?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-t-[40px] shadow-2xl overflow-hidden border-x border-t border-sakoon-teal/5">
      {/* Chat header */}
      <div className="bg-sakoon-cream p-4 border-b border-sakoon-teal/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sakoon-teal flex items-center justify-center text-sakoon-cream shadow-inner">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sakoon-teal leading-none">Humraaz</h3>
            <span className="text-[10px] uppercase tracking-widest text-sakoon-teal/40 font-bold">Your Companion</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-sakoon-sage animate-pulse"></div>
          <span className="text-xs font-bold text-sakoon-teal/40 uppercase">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-gradient-to-b from-sakoon-cream/30 to-white"
      >
        {messages.map((message) => (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${
                message.role === 'user' ? 'bg-sakoon-clay text-white' : 'bg-sakoon-teal text-white shadow-sm'
              }`}>
                {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`p-4 rounded-3xl text-sm leading-relaxed ${
                message.role === 'user' 
                  ? 'bg-sakoon-clay text-white rounded-tr-none shadow-lg shadow-sakoon-clay/10' 
                  : 'bg-white text-sakoon-teal border border-sakoon-teal/5 rounded-tl-none shadow-sm'
              }`}>
                {message.content}
                <div className={`text-[10px] mt-2 opacity-50 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-sakoon-teal text-white flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-white border border-sakoon-teal/5 p-4 rounded-3xl rounded-tl-none shadow-sm flex gap-1">
                <span className="w-1.5 h-1.5 bg-sakoon-teal/20 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-sakoon-teal/20 rounded-full animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 bg-sakoon-teal/20 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="p-6 bg-white border-t border-sakoon-teal/5">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Share your thoughts..."
            className="w-full bg-sakoon-cream/50 border border-sakoon-teal/5 py-4 pl-6 pr-14 rounded-full focus:outline-none focus:ring-2 focus:ring-sakoon-teal/10 transition-all text-sakoon-teal"
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className={`absolute right-2 p-3 rounded-full transition-all ${
              input.trim() && !isLoading 
                ? 'bg-sakoon-teal text-white shadow-lg shadow-sakoon-teal/20 active:scale-95' 
                : 'bg-sakoon-teal/10 text-sakoon-teal/30 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[10px] text-center mt-4 text-sakoon-teal/30 font-bold uppercase tracking-widest">
          Humraaz is an AI helper, not a replacement for medical advice.
        </p>
      </div>
    </div>
  );
}
