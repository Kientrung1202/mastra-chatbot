import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, MessageCircle, X } from 'lucide-react';
import { baseUrl } from '../lib/mastra-client';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatInterfaceProps {
  baseUrl?: string;
  agentEndpoint?: string;
  welcomeMessage?: string;
  placeholder?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  showToggleButton?: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  baseUrl: customBaseUrl,
  agentEndpoint = "resumeAgent",
  welcomeMessage = "Hi! I'm Trung's AI resume assistant. I can help you learn about his professional background, skills, and experience. What would you like to know?",
  placeholder = "Ask about experience, skills...",
  title = "AI Resume Assistant",
  subtitle = "Chat with Trung's AI assistant",
  className = "",
  isOpen = true,
  onToggle,
  showToggleButton = false
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: welcomeMessage,
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [internalIsOpen, setInternalIsOpen] = useState(isOpen);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatIsOpen = onToggle ? isOpen : internalIsOpen;

  const toggleChat = () => {
    const newState = !chatIsOpen;
    if (onToggle) {
      onToggle(newState);
    } else {
      setInternalIsOpen(newState);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiBaseUrl = customBaseUrl || baseUrl;
      const response = await fetch(`${apiBaseUrl}/api/agents/${agentEndpoint}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: input,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.text || 'Sorry, I had trouble processing your request.',
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again later.',
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Toggle button (shown when showToggleButton is true or when chat is closed)
  if (!chatIsOpen && showToggleButton) {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <button
          onClick={toggleChat}
          className="bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full bg-white shadow-lg rounded-2xl overflow-hidden ${className}`}>
      {/* Header - Fixed */}
      <div className="flex-shrink-0 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-3 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-2xl flex items-center justify-center">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h1 className="font-semibold text-lg">{title}</h1>
              <p className="text-green-100 text-sm">{subtitle}</p>
            </div>
          </div>
          {showToggleButton && (
            <button
              onClick={toggleChat}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Messages - Scrollable */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-2 ${
              message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div className="w-6 h-6 rounded-2xl flex items-center justify-center flex-shrink-0">
              {message.role === 'user' ? (
                <div className="w-full h-full bg-primary-500 rounded-2xl flex items-center justify-center">
                  <User className="w-3 h-3 text-white" />
                </div>
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center">
                  <Bot className="w-3 h-3 text-gray-600" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`chat-bubble ${
                  message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'
                }`}
              >
                {message.content}
              </div>
              <div className={`text-xs text-gray-500 mt-1 ${
                message.role === 'user' ? 'text-right text-gray-500' : ''
              }`}>
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-200 rounded-2xl flex items-center justify-center">
              <Bot className="w-3 h-3 text-gray-600" />
            </div>
            <div className="flex-1">
              <div className="">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input - Fixed at bottom */}
      <div className="flex-shrink-0 border-none bg-white px-3 py-3">
        <div className="flex space-x-2">
          <div className="flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="chat-input min-h-[2.5rem] max-h-32"
              rows={1}
              disabled={isLoading}
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="self-end bg-primary-500 text-white p-2 rounded-2xl hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}; 