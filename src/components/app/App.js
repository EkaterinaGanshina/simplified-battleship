import React from 'react';
import { data } from '../../data';
import './App.css';

export const App = () => {
  console.log(data);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Battleship Game</h1>
      </header>
    </div>
  );
};
