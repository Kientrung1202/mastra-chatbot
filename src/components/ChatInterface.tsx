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
      <div className={className}>
        <button
          onClick={toggleChat}
          className="chat-toggle-btn"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className={`chat-container ${className}`}>
      {/* Header - Fixed */}
      <div className="chat-header">
        <div className="chat-header-content">
          <div className="chat-header-info">
            <div className="chat-header-icon">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h1 className="chat-header-title">{title}</h1>
              <p className="chat-header-subtitle">{subtitle}</p>
            </div>
          </div>
          {showToggleButton && (
            <button
              onClick={toggleChat}
              className="chat-close-btn"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Messages - Scrollable */}
      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-message ${
              message.role === 'user' ? 'chat-message-user' : ''
            }`}
          >
            <div className={`chat-message-avatar ${
              message.role === 'user' ? 'chat-message-avatar-user' : 'chat-message-avatar-assistant'
            }`}>
              {message.role === 'user' ? (
                <User className="w-3 h-3" />
              ) : (
                <Bot className="w-3 h-3" />
              )}
            </div>
            <div className="chat-message-content">
              <div
                className={`chat-bubble ${
                  message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'
                }`}
              >
                {message.content}
              </div>
              <div className={`chat-message-time ${
                message.role === 'user' ? 'chat-message-time-user' : ''
              }`}>
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="chat-loading">
            <div className="chat-message-avatar chat-message-avatar-assistant">
              <Bot className="w-3 h-3" />
            </div>
            <div className="chat-message-content">
              <div className="chat-loading-dots">
                <div className="chat-loading-dot"></div>
                <div className="chat-loading-dot"></div>
                <div className="chat-loading-dot"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input - Fixed at bottom */}
      <div className="chat-input-area">
        <div className="chat-input-wrapper">
          <div className="chat-input-field">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="chat-input"
              style={{ minHeight: '2.5rem', maxHeight: '8rem' }}
              rows={1}
              disabled={isLoading}
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="chat-send-btn"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}; 