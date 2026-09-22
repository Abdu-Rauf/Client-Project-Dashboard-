import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    // create a react root(special react object) connected to the dom element(wiht id root) and manage everything inside it
    // render puts the components passed to it inside the react root object
    // StrictMode wraps the app to catch runtime errors
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
