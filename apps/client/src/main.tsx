import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
// import './normalize.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ChakraProvider>,
)
