import React from 'react';
import ReactDOM from 'react-dom/client';
import {persistor, store} from './redux/store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/integration/react';
import {CssBaseline, StyledEngineProvider, ThemeProvider} from "@mui/material";
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter basename="/slim-mom">
                    <ThemeProvider theme={theme}>
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline />
                        <StyledEngineProvider injectFirst>
                            <App />
                        </StyledEngineProvider>
                    </ThemeProvider>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
