import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter for routing
import { Provider } from 'react-redux';  // Import Provider to connect Redux store
import './index.css';  // Your global CSS
import App from './App.jsx';  // Your main app component
import store from './Pages/store.js';  // Import the Redux store

// Create the root for the React application and render it
const root = createRoot(document.getElementById('root'));

// Render the app wrapped in StrictMode, BrowserRouter, and Provider
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
