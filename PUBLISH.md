# Publishing Guide for @trungnk/personal-webchat-lib

## Prerequisites
- npm account: trungnk
- Node.js 22: `nvm use 22`
- Built package: `pnpm run build:lib`

## Publishing Steps

### 1. Login to npm
```bash
npm login
```

### 2. Verify package contents
```bash
pnpm pack
tar -tzf trungnk-personal-webchat-lib-1.0.0.tgz
```

### 3. Check if package name is available
```bash
npm view @trungnk/personal-webchat-lib
```

### 4. Publish (first time)
```bash
npm publish --access public
```

### 5. Future updates
```bash
# Update version in package.json, then:
pnpm run build:lib
npm publish
```

## Version Management

### Patch release (bug fixes): 1.0.0 → 1.0.1
```bash
npm version patch
npm publish
```

### Minor release (new features): 1.0.0 → 1.1.0
```bash
npm version minor
npm publish
```

### Major release (breaking changes): 1.0.0 → 2.0.0
```bash
npm version major
npm publish
```

## Verify Publication
```bash
npm view @trungnk/personal-webchat-lib
```

## Test Installation
```bash
# In a test project
npm install @trungnk/personal-webchat-lib
```

## Package Contents
Your published package includes:
- `dist/index.js` - CommonJS build
- `dist/index.es.js` - ES modules build  
- `dist/index.d.ts` - TypeScript declarations
- `dist/style.css` - Component styles
- `README.md` - Documentation
- `package.json` - Package metadata

## Usage After Publishing
```tsx
import { ChatInterface } from '@trungnk/personal-webchat-lib';
import '@trungnk/personal-webchat-lib/style.css';
``` 