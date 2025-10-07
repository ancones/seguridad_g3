import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthProvider.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './reducer/store.jsx';

import { Provider } from "react-redux";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </Provider>
      </AuthProvider>
    </BrowserRouter>    
  </StrictMode>,
)
