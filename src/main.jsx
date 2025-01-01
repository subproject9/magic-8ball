import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Force dark background on mount
document.body.style.backgroundColor = '#000428'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
