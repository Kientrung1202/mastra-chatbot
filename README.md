# Personal Webchat Library

A modern React chat interface library for seamless integration with Mastra AI backend systems. Build beautiful, responsive chatbots and AI assistants with minimal setup.

[![npm version](https://badge.fury.io/js/@trungnk%2Fpersonal-webchat-lib.svg)](https://badge.fury.io/js/@trungnk%2Fpersonal-webchat-lib)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎯 **Toggle Mode**: Floating chatbot with smooth open/close animations
- 📱 **Mobile Responsive**: Optimized for all screen sizes with mobile-first design
- 🎨 **Beautiful Design**: Modern UI with light green theme and rounded corners
- ⚡ **TypeScript Ready**: Full type safety and excellent developer experience
- 🔧 **Flexible Integration**: Embedded component or floating widget modes
- 🎪 **Sticky Input**: Input area always stays at the bottom for better UX
- 📐 **Optimal Dimensions**: 600px minimum height, 350px minimum width
- 🤖 **Multi-Agent Support**: Configurable agent endpoints for different AI assistants
- 🚀 **Zero Config**: Works out of the box with sensible defaults
- 🎛️ **Highly Customizable**: Extensive props for tailoring to your needs

## 📦 Installation

```bash
npm install @trungnk/personal-webchat-lib
```

```bash
yarn add @trungnk/personal-webchat-lib
```

```bash
pnpm add @trungnk/personal-webchat-lib
```

## 🚀 Quick Start

```tsx
import { ChatInterface } from '@trungnk/personal-webchat-lib';
import '@trungnk/personal-webchat-lib/style.css';

function App() {
  return (
    <div style={{ height: '700px' }}>
      <ChatInterface 
        baseUrl="https://your-mastra-backend.com"
        agentEndpoint="resume-agent"
        title="AI Assistant"
        subtitle="How can I help you?"
      />
    </div>
  );
}
```

## 📖 Usage Examples

### 1. Embedded Chat (Always Visible)

Perfect for dedicated chat pages or customer support sections.

```tsx
import { ChatInterface } from '@trungnk/personal-webchat-lib';

function CustomerSupport() {
  return (
    <div className="h-[700px] w-full max-w-4xl mx-auto">
      <ChatInterface 
        agentEndpoint="support-agent"
        title="Customer Support"
        subtitle="We're here to help you 24/7"
        placeholder="Describe your issue..."
        welcomeMessage="Hello! I'm here to help you with any questions or issues you might have. How can I assist you today?"
      />
    </div>
  );
}
```

### 2. Floating Chat Widget

Ideal for websites where you want an unobtrusive chat option.

```tsx
import { useState } from 'react';
import { ChatInterface } from '@trungnk/personal-webchat-lib';

function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ChatInterface
      isOpen={isOpen}
      onToggle={setIsOpen}
      showToggleButton={true}
      agentEndpoint="resume-agent"
      className={isOpen ? "fixed bottom-4 right-4 w-96 h-[590px] z-50 shadow-2xl" : ""}
      title="AI Assistant"
      subtitle="Ask me anything!"
    />
  );
}
```

### 3. Multi-Agent Chat System

Switch between different AI agents dynamically.

```tsx
import { useState } from 'react';
import { ChatInterface } from '@trungnk/personal-webchat-lib';

function MultiAgentChat() {
  const [selectedAgent, setSelectedAgent] = useState('resume-agent');

  const agents = [
    { id: 'resume-agent', name: 'Resume Assistant', subtitle: 'Ask about experience & skills' },
    { id: 'support-agent', name: 'Support Agent', subtitle: 'Get help with technical issues' },
    { id: 'sales-agent', name: 'Sales Assistant', subtitle: 'Learn about our products' }
  ];

  const currentAgent = agents.find(agent => agent.id === selectedAgent);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Agent Selector */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Choose Your Assistant</h2>
        <div className="flex gap-3 flex-wrap">
          {agents.map(agent => (
            <button
              key={agent.id}
              onClick={() => setSelectedAgent(agent.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedAgent === agent.id 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {agent.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Chat Interface */}
      <div className="h-[700px] bg-white rounded-2xl shadow-lg">
        <ChatInterface 
          agentEndpoint={selectedAgent}
          title={currentAgent?.name}
          subtitle={currentAgent?.subtitle}
          key={selectedAgent} // Force re-render when agent changes
        />
      </div>
    </div>
  );
}
```

### 4. Conditional Chat Loading

Show different states based on backend connectivity.

```tsx
import { useState, useEffect } from 'react';
import { ChatInterface } from '@trungnk/personal-webchat-lib';

function ConditionalChat() {
  const [isBackendReady, setIsBackendReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check backend health
    fetch('https://your-backend.com/health')
      .then(res => res.ok ? setIsBackendReady(true) : setError('Backend unavailable'))
      .catch(() => setError('Connection failed'));
  }, []);

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  if (!isBackendReady) {
    return <div className="p-4">Loading chat interface...</div>;
  }

  return (
    <div className="h-[700px]">
      <ChatInterface 
        baseUrl="https://your-backend.com"
        agentEndpoint="support-agent"
        title="AI Support"
      />
    </div>
  );
}
```

## ⚙️ API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `baseUrl` | `string` | `"http://localhost:4111"` | Mastra backend URL |
| `agentEndpoint` | `string` | `"resume-agent"` | Agent endpoint name (e.g., "resume-agent", "support-agent") |
| `welcomeMessage` | `string` | Default welcome message | Initial message from the assistant |
| `placeholder` | `string` | `"Ask about experience, skills..."` | Input field placeholder text |
| `title` | `string` | `"AI Resume Assistant"` | Chat header title |
| `subtitle` | `string` | `"Chat with Trung's AI assistant"` | Chat header subtitle |
| `className` | `string` | `""` | Additional CSS classes for the container |
| `isOpen` | `boolean` | `true` | Controls chat visibility (controlled mode) |
| `onToggle` | `(isOpen: boolean) => void` | `undefined` | Callback for toggle events |
| `showToggleButton` | `boolean` | `false` | Show open/close toggle buttons |

### TypeScript Interfaces

```tsx
interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatInterfaceProps {
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
```

## 🎨 Styling & Customization

### Design System

The library uses a mobile-first design approach with consistent typography:

- **Chat bubbles**: 14px, optimized for readability
- **Input field**: 14px with smooth focus transitions
- **Header title**: 18px, semi-bold
- **Header subtitle**: 14px, light green accent
- **Border radius**: 16px for modern, friendly appearance

### Recommended Dimensions

Choose dimensions based on your use case:

```tsx
// Embedded Chat (Full page integration)
<div className="h-[590px]">        {/* Compact - good for sidebars */}
<div className="h-[700px]">        {/* Optimal - recommended default */}
<div className="h-[900px]">        {/* Spacious - immersive experience */}

// Floating Chat (Widget mode)
className="w-80 h-[500px]"         {/* Mobile-friendly compact */}
className="w-96 h-[590px]"         {/* Standard desktop widget */}
className="w-[28rem] h-[700px]"    {/* Large desktop widget */}
```

### Theme Customization

Override the default green theme with CSS variables:

```css
.personal-webchat-lib {
  /* Primary colors */
  --primary-500: #22c55e;  /* Main green */
  --primary-600: #16a34a;  /* Darker green for hover states */
  
  /* Or use your brand colors */
  --primary-500: #3b82f6;  /* Blue theme */
  --primary-600: #2563eb;
  
  /* Additional customizations */
  --border-radius: 1rem;   /* Adjust roundness */
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); /* Custom shadow */
}
```

### CSS Class Overrides

Target specific elements for advanced styling:

```css
/* Customize chat bubbles */
.chat-bubble-user {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.chat-bubble-assistant {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
}

/* Customize input area */
.chat-input {
  border: 2px solid #e2e8f0;
  background-color: #ffffff;
}

.chat-input:focus {
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}
```

## 🔗 Backend Integration

### Mastra AI Setup

This library is designed for [Mastra AI](https://mastra.ai) backends. The agent endpoint structure follows Mastra conventions.

#### API Endpoint Pattern

```
POST {baseUrl}/api/agents/{agentEndpoint}/generate
```

**Examples:**
- `agentEndpoint="resume-agent"` → `/api/agents/resume-agent/generate`
- `agentEndpoint="support-agent"` → `/api/agents/support-agent/generate`
- `agentEndpoint="sales-agent"` → `/api/agents/sales-agent/generate`

#### Request Format

```json
{
  "messages": [
    {
      "role": "user",
      "content": "User's message here"
    }
  ]
}
```

#### Expected Response

```json
{
  "text": "AI assistant response"
}
```

### Environment Configuration

Create a `.env` file in your project root:

```bash
# Required: Your Mastra backend URL
VITE_MASTRA_BASE_URL=https://your-mastra-backend.com

# Optional: Default agent if not specified in props
VITE_DEFAULT_AGENT=resume-agent
```

### Multi-Agent Backend Setup

Configure multiple agents in your Mastra backend:

```typescript
// Backend: src/mastra/index.ts
import { Mastra } from '@mastra/core';
import { resumeServer } from './mcp-server/resume-server';
import { supportServer } from './mcp-server/support-server';
import { salesServer } from './mcp-server/sales-server';

export const mastra = new Mastra({
  mcpServers: {
    resume: resumeServer,     // Accessible as "resume-agent"
    support: supportServer,   // Accessible as "support-agent"
    sales: salesServer,       // Accessible as "sales-agent"
  }
});
```

### Error Handling

The library includes built-in error handling for common scenarios:

- **Network errors**: Shows user-friendly "connection failed" message
- **Server errors**: Displays "service unavailable" message
- **Timeout errors**: Handles long-running requests gracefully
- **Invalid responses**: Falls back to error message when response is malformed

## 🔧 Development

### Local Development

```bash
# Clone the repository
git clone https://github.com/trungnk/personal-webchat
cd personal-webchat/personal-webchat-web

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:5173
```

### Building the Library

```bash
# Build for production
pnpm build:lib

# The built files will be in the `dist/` directory
# - dist/index.js (CommonJS)
# - dist/index.es.js (ES modules)
# - dist/index.d.ts (TypeScript declarations)
# - dist/style.css (Styles)
```

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 Examples & Demos

Check out the [live demo](https://your-demo-url.com) to see the library in action.

### Framework Integration Examples

<details>
<summary><strong>Next.js Integration</strong></summary>

```tsx
// pages/chat.tsx or app/chat/page.tsx
'use client'; // Required for client-side interactions

import dynamic from 'next/dynamic';
import '@trungnk/personal-webchat-lib/style.css';

const ChatInterface = dynamic(
  () => import('@trungnk/personal-webchat-lib').then(mod => ({ default: mod.ChatInterface })),
  { 
    ssr: false,
    loading: () => <div className="h-[700px] bg-gray-100 animate-pulse rounded-2xl" />
  }
);

export default function ChatPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">AI Assistant</h1>
      <div className="h-[700px]">
        <ChatInterface 
          baseUrl={process.env.NEXT_PUBLIC_MASTRA_URL}
          agentEndpoint="support-agent"
        />
      </div>
    </div>
  );
}
```
</details>

<details>
<summary><strong>Vite + React Integration</strong></summary>

```tsx
// src/components/Chat.tsx
import { ChatInterface } from '@trungnk/personal-webchat-lib';
import '@trungnk/personal-webchat-lib/style.css';

export const Chat: React.FC = () => {
  return (
    <div className="h-[700px] w-full">
      <ChatInterface 
        baseUrl={import.meta.env.VITE_MASTRA_BASE_URL}
        agentEndpoint="resume-agent"
        title="AI Assistant"
      />
    </div>
  );
};
```
</details>

## 🐛 Troubleshooting

### Common Issues

**Chat not connecting to backend:**
- Verify `baseUrl` is correct and accessible
- Check CORS settings on your backend
- Ensure the agent endpoint exists in your Mastra setup

**Styling issues:**
- Make sure to import the CSS: `import '@trungnk/personal-webchat-lib/style.css'`
- Check for CSS conflicts with your existing styles
- Verify Tailwind CSS isn't conflicting (the library includes its own styles)

**TypeScript errors:**
- Ensure you're using TypeScript 4.9+ for best compatibility
- Import types explicitly: `import type { ChatInterfaceProps } from '@trungnk/personal-webchat-lib'`

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

- 📖 [Documentation](https://github.com/trungnk/personal-webchat/wiki)
- 🐛 [Issue Tracker](https://github.com/trungnk/personal-webchat/issues)
- 💬 [Discussions](https://github.com/trungnk/personal-webchat/discussions)

---

Made with ❤️ by [Trung NK](https://github.com/trungnk)
