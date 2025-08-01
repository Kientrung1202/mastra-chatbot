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
          className="ktr_chat_toggle_btn"
          aria-label="Open chat"
        >
          <MessageCircle className="ktr_w_6 ktr_h_6" />
        </button>
      </div>
    );
  }

  return (
    <div className={`ktr_chat_container ${className}`}>
      {/* Header - Fixed */}
      <div className="ktr_chat_header">
        <div className="ktr_chat_header_content">
          <div className="ktr_chat_header_info">
            <div className="ktr_chat_header_icon">
              <MessageCircle className="ktr_w_4 ktr_h_4" />
            </div>
            <div>
              <h1 className="ktr_chat_header_title">{title}</h1>
              <p className="ktr_chat_header_subtitle">{subtitle}</p>
            </div>
          </div>
          {showToggleButton && (
            <button
              onClick={toggleChat}
              className="ktr_chat_close_btn"
              aria-label="Close chat"
            >
              <X className="ktr_w_5 ktr_h_5" />
            </button>
          )}
        </div>
      </div>

      {/* Messages - Scrollable */}
      <div className="ktr_chat_messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`ktr_chat_message ${
              message.role === 'user' ? 'ktr_chat_message_user' : ''
            }`}
          >
            <div className={`ktr_chat_message_avatar ${
              message.role === 'user' ? 'ktr_chat_message_avatar_user' : 'ktr_chat_message_avatar_assistant'
            }`}>
              {message.role === 'user' ? (
                <User className="ktr_w_3 ktr_h_3" />
              ) : (
                <Bot className="ktr_w_3 ktr_h_3" />
              )}
            </div>
            <div className="ktr_chat_message_content" style={{ alignItems: message.role === 'user' ? 'end' : 'start' }}>
              <div
                className={`ktr_chat_bubble ${
                  message.role === 'user' ? 'ktr_chat_bubble_user' : 'ktr_chat_bubble_assistant'
                }`}
              >
                {message.content}
              </div>
              <div className={`ktr_chat_message_time ${
                message.role === 'user' ? 'ktr_chat_message_time_user' : ''
              }`}>
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="ktr_chat_loading">
            <div className="ktr_chat_message_avatar ktr_chat_message_avatar_assistant">
              <Bot className="ktr_w_3 ktr_h_3" />
            </div>
            <div className="ktr_chat_message_content">
              <div className="ktr_chat_loading_dots">
                <div className="ktr_chat_loading_dot"></div>
                <div className="ktr_chat_loading_dot"></div>
                <div className="ktr_chat_loading_dot"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input - Fixed at bottom */}
      <div className="ktr_chat_input_area">
        <div className="ktr_chat_input_wrapper">
          <div className="ktr_chat_input_field">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="ktr_chat_input"
              style={{ minHeight: '2.5rem', maxHeight: '8rem' }}
              rows={1}
              disabled={isLoading}
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="ktr_chat_send_btn"
          >
            <Send className="ktr_w_4 ktr_h_4" />
          </button>
        </div>
      </div>
    </div>
  );
}; 