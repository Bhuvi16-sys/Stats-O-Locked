import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/* Suppress known third-party deprecation warnings that we can't fix
   (they're inside library code, not ours, and don't affect behaviour). */
if (import.meta.env.DEV) {
  const _warn = console.warn.bind(console)
  console.warn = (...args) => {
    const msg = typeof args[0] === 'string' ? args[0] : ''
    if (msg.includes('THREE.Clock') || msg.includes('THREE.Timer')) return
    _warn(...args)
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

/* Register service worker for cache-first asset serving on repeat visits */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      /* SW registration is a progressive enhancement — fail silently */
    });
  });
}
