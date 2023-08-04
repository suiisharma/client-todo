import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider} from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <ChakraProvider>
  <Toaster></Toaster>
  <App />
  </ChakraProvider>
  </React.StrictMode>
);


