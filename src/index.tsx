import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StoreProvider } from "./store/StoreProvider";
import AppStore from "./store/AppStore";

const domNode = document.getElementById('root') as HTMLElement;
const reactNode = (
    <React.StrictMode>
        <StoreProvider value={new AppStore((window as any).__PRELOADED_STATE__)}>
            <App />
        </StoreProvider>
    </React.StrictMode>
);

ReactDOM.hydrateRoot(
    domNode,
    reactNode
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
