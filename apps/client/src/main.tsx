import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import './index.css'
// import './normalize.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: '',
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },

            // Default options for specific types
            success: {
              duration: 3000,
            },
          }}
        />
        <App />
      </BrowserRouter>
    </Provider>
  </ChakraProvider>,
)
