import { useState } from 'react';
import { ChatInterface } from './components/ChatInterface';
import './index.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Personal Webchat Demo</h1>
        
        {/* Demo with toggle button */}
        <div className="relative h-96 bg-gray-50 rounded-lg p-4 mb-8">
          <h2 className="text-xl font-semibold mb-4">Toggle Mode (Click the button in bottom-right)</h2>
          <p className="text-gray-600">This demonstrates the chatbot with a toggle button that opens/closes the chat.</p>
          
          <ChatInterface
            isOpen={isOpen}
            onToggle={setIsOpen}
            showToggleButton={true}
            agentEndpoint="resumeAgent"
            className={isOpen ? "fixed bottom-4 right-4 w-96 h-[590px] z-50" : ""}
          />
        </div>

        {/* Demo always open */}
        <div className="h-[700px] bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold p-4 border-b">Always Open Mode - Resume Agent</h2>
          <div className="h-[650px]">
            <ChatInterface 
              agentEndpoint="resumeAgent"
              title="Resume Assistant"
              subtitle="Ask about Trung's experience"
              placeholder="Ask about skills, experience..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
