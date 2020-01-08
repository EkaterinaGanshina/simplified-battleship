import React from 'react';
import './App.css';
import { data } from '../../data';
import { Board } from '../playboard/Board';

export const App = () => {
  console.log(data);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Battleship Game</h1>
      </header>

      <main>
        <Board />
      </main>
    </div>
  );
};
