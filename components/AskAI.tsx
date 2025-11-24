import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, Loader2, X } from 'lucide-react';
import { askGeminiAboutContent } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AskAIProps {
  contextContent: string;
  isOpen: boolean;
  onClose: () => void;
}

const AskAI: React.FC<AskAIProps> = ({ contextContent, isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi! I can help you understand this tutorial. Ask me anything about it.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    const answer = await askGeminiAboutContent(contextContent, userMsg);

    setMessages(prev => [...prev, { role: 'model', text: answer }]);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-slate-900 border-l border-slate-700 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between bg-slate-800/50 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-600/20 rounded-lg">
             <Sparkles className="w-5 h-5 text-blue-400" />
          </div>
          <h3 className="font-semibold text-white">AI Assistant</h3>
        </div>
        <button 
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`
              max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed
              ${msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'}
            `}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 rounded-2xl rounded-bl-none border border-slate-700 px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
              <span className="text-xs text-slate-400">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-700 bg-slate-900">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
            placeholder="Ask about this content..."
            className="w-full bg-slate-800 text-white placeholder-slate-500 border border-slate-700 rounded-full py-3 pl-4 pr-12 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-1.5 p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-2 text-center">
            <span className="text-[10px] text-slate-500">AI can make mistakes. Check important info.</span>
        </div>
      </div>
    </div>
  );
};

export default AskAI;