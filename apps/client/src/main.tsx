import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import './index.css'
// import './normalize.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ChakraProvider>,
)
