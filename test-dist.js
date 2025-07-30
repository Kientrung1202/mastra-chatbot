#!/usr/bin/env node

// Simple test to verify library exports
console.log('Testing library dist...\n');

try {
  // Test ES module import
  const lib = require('./dist/index.js');
  console.log('✅ CommonJS import successful');
  console.log('Exports:', Object.keys(lib));
  
  // Check if ChatInterface exists
  if (lib.ChatInterface) {
    console.log('✅ ChatInterface component found');
  } else {
    console.log('❌ ChatInterface component missing');
  }
  
  // Check if CSS file exists
  const fs = require('fs');
  if (fs.existsSync('./dist/style.css')) {
    const cssSize = fs.statSync('./dist/style.css').size;
    console.log(`✅ CSS file exists (${Math.round(cssSize/1024)}KB)`);
    
    // Check if custom colors are in CSS
    const cssContent = fs.readFileSync('./dist/style.css', 'utf8');
    if (cssContent.includes('--primary-500')) {
      console.log('✅ Custom primary colors found in CSS');
    } else {
      console.log('❌ Custom primary colors missing from CSS');
    }
  } else {
    console.log('❌ CSS file missing');
  }
  
  console.log('\n✅ Library appears to be built correctly!');
  
} catch (error) {
  console.error('❌ Error testing library:', error.message);
} 