// src/App.js
import React from 'react';
import AppRoutes from './routes/Routes';
import Menu from './components/Menu';
import './app.css';

const App = () => {
  return (
    <div>
      <Menu />
      <AppRoutes />
    </div>
  );
};

export default App;
