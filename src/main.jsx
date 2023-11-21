import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { routes } from './routes/index.jsx'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AuthProvider from './context/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={routes} />
        <Toaster />
      </AuthProvider>
    </Provider>
  </>
)
