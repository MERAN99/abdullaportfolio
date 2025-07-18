import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import GenerateTexture from './GenerateTexture.jsx'

// Simple routing based on URL path
const path = window.location.pathname;

let Component = App;
if (path === '/generate-texture') {
  Component = GenerateTexture;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Component />
  </StrictMode>,
)
