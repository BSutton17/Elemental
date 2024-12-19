import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { GameProvider } from './Store/GameContext';  // Import GameProvider

createRoot(document.getElementById('root')).render(
  <GameProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </GameProvider>,
);
