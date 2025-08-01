import { useState } from 'react';
import { ChatInterface } from './components/ChatInterface';
import './index.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="ktr_min_h_screen ktr_bg_gray_100 ktr_p_4">
      <div className="ktr_max_w_6xl ktr_mx_auto">
        <h1 className="ktr_text_3xl ktr_font_bold ktr_text_center ktr_mb_8">Personal Webchat Demo</h1>
        
        {/* Demo with toggle button */}
        <div className="ktr_relative ktr_h_96 ktr_bg_gray_50 ktr_rounded_lg ktr_p_4 ktr_mb_8">
          <h2 className="ktr_text_xl ktr_font_semibold ktr_mb_4">Toggle Mode (Click the button in bottom-right)</h2>
          <p className="ktr_text_gray_600">This demonstrates the chatbot with a toggle button that opens/closes the chat.</p>
          
          <ChatInterface
            isOpen={isOpen}
            onToggle={setIsOpen}
            showToggleButton={true}
            agentEndpoint="resumeAgent"
            className={isOpen ? "ktr_fixed ktr_bottom_4 ktr_right_4 ktr_w_96 ktr_h_590 ktr_z_50" : ""}
          />
        </div>

        {/* Demo always open */}
        <div className="ktr_h_700 ktr_bg_white ktr_rounded_lg ktr_shadow_lg">
          <h2 className="ktr_text_xl ktr_font_semibold ktr_p_4 ktr_border_b">Always Open Mode - Resume Agent</h2>
          <div className="ktr_h_650">
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
