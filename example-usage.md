# Quick Integration Example

## Test in a New React Project

1. **Create a new React app:**
```bash
npx create-react-app test-chat-lib --template typescript
cd test-chat-lib
```

2. **Install the library:**
```bash
# Install from local build (for testing)
npm install /path/to/trung-personal-webchat-lib-1.0.0.tgz

# Or install from npm (after publishing)
npm install @trungnk/personal-webchat-lib
```

3. **Update `src/App.tsx`:**
```tsx
import React from 'react';
import { ChatInterface } from '@trungnk/personal-webchat-lib';
import '@trungnk/personal-webchat-lib/styles';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat Interface Test</h1>
        <div style={{ 
          height: '600px', 
          width: '400px', 
          margin: '20px auto',
          border: '1px solid #ccc',
          borderRadius: '16px',
          overflow: 'hidden'
        }}>
          <ChatInterface 
            baseUrl="http://localhost:3456"
            title="Test Assistant"
            subtitle="Testing the chat library"
            welcomeMessage="Hello! This is a test of the chat library."
            placeholder="Type a test message..."
          />
        </div>
      </header>
    </div>
  );
}

export default App;
```

4. **Start the development server:**
```bash
npm start
```

## Integration Notes

- **Backend**: Make sure your Mastra backend is running on port 3456
- **Styling**: The library includes its own CSS that you must import
- **Props**: All props are optional with sensible defaults
- **Customization**: You can override styles with your own CSS

## Testing the Package Contents

```bash
# Extract and inspect the package
tar -tzf trung-personal-webchat-lib-1.0.0.tgz
```

Should include:
- `package/dist/personal-webchat-lib.es.js`
- `package/dist/personal-webchat-lib.umd.js` 
- `package/dist/index.d.ts`
- `package/README.md`
- `package/package.json` 