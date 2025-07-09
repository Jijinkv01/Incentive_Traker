import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/UserAuthContext.jsx'
import { DepotProvider } from './context/DepotContext.jsx'
import { CompanyProvider } from './context/CompanyContext.jsx'
import { RecordProvider } from './context/RecordContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
  <DepotProvider>
    <CompanyProvider>
      <RecordProvider>
        <App />
      </RecordProvider>
    </CompanyProvider>
  </DepotProvider>
  </AuthProvider>
  </BrowserRouter>,
)
