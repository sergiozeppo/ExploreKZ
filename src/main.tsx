import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Базовая инициализация рендера
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
