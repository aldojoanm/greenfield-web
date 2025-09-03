import ReactDOM from 'react-dom/client'
import * as React from 'react'
import App from './App.tsx'
import './index.css'
import { ParallaxProvider } from 'react-scroll-parallax'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ParallaxProvider>
      <App />
    </ParallaxProvider>
  </React.StrictMode>
)
