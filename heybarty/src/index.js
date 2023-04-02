import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import {BrowserRouter} from "react-router-dom";
import {ColorModeScript } from "@chakra-ui/color-mode"
import {Provider} from "react-redux"
import { store } from './redux/store';
import theme from './theme';
import { AuthcontextProvider } from './context/Authcontext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <BrowserRouter>
    <Provider store={store}>
    <AuthcontextProvider>
    <App />
    </AuthcontextProvider>
    </Provider>
    </BrowserRouter>
    </ChakraProvider>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
