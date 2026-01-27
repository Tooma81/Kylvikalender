import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Log unexpected errors so "content disappears" is debuggable
window.addEventListener('error', (e) => {
  console.error('Window error:', e.error || e.message, e.filename, e.lineno);
});
window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});

const rootEl = document.getElementById('root');
const root = ReactDOM.createRoot(rootEl);
root.render(<App />);

// Diagnostic: if content "disappears" with no errors, log once when root is empty or hidden
let diagnosticLogged = false;
function diagnosticLog() {
  if (!rootEl || diagnosticLogged) return;
  const isEmpty = !rootEl.firstChild || rootEl.children.length === 0;
  const first = rootEl.firstChild;
  let hidden = false;
  if (first && first instanceof Element) {
    const s = window.getComputedStyle(first);
    hidden = s.visibility === 'hidden' || parseFloat(s.opacity) === 0 || s.display === 'none';
  }
  if (isEmpty || hidden) {
    diagnosticLogged = true;
    const s = first && first instanceof Element ? window.getComputedStyle(first) : {};
    console.warn('[Külvikalender] Content missing or hidden:', { empty: isEmpty, visibility: s.visibility, opacity: s.opacity, display: s.display });
  }
}
const diagInterval = setInterval(diagnosticLog, 1000);
setTimeout(() => clearInterval(diagInterval), 12000);
