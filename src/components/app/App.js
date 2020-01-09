import React from 'react';
import './App.css';
import { data } from '../../data';
import * as Helpers from '../../helpers';
import { Board } from '../playboard/Board';
import { MessageBar } from '../messageBar/MessageBar';
import { cellStates, messages } from '../../constants';

export class App extends React.Component {
  shipsSunk = 0;
  isGameOver = false;

  state = {
    cells: Helpers.createEmptyCells(),
    ships: Helpers.createShips(data.layout),
    message: messages.initial,
  };

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Battleship Game</h1>
        </header>

        <main>
          <Board
            cells={this.state.cells}
            ships={this.state.ships}
            onCellClick={this.changeCellState}
          />

          <MessageBar message={this.state.message} />
        </main>
      </div>
    );
  }

  changeCellState = (x, y) => {
    if (this.isGameOver) {
      return;
    }

    const { ships } = this.state;
    let cellFound = false;

    // iterate over ships
    for (let i = 0; i < ships.length; i += 1) {
      const { positions } = ships[i];

      // iterate over coordinates of each cell
      for (let j = 0; j < positions.length; j += 1) {
        if (positions[j][0] === x && positions[j][1] === y) {
          this.updateBoardState(x, y, cellStates.hit, i);
          cellFound = true;
          break;
        }
      }

      if (cellFound) break;
    }

    if (!cellFound) {
      this.updateBoardState(x, y, cellStates.miss);
    }
  };

  updateBoardState(i, j, state, shipIndex) {
    const newShips = [...this.state.ships];
    let newCells = [...this.state.cells];
    let newMessage = Helpers.getMessage(state);

    newCells[i][j] = state;

    if (shipIndex != null) {
      const currentShip = newShips[shipIndex];
      currentShip.hitCount += 1;

      // check if this ship should be sunk
      if (currentShip.hitCount === currentShip.positions.length) {
        newCells = this.sinkShip(shipIndex, newCells);
        newMessage = messages.sunk;
      }
    }

    // check if game is over
    if (this.shipsSunk === this.state.ships.length) {
      this.isGameOver = true;
      newMessage = messages.win;
    }

    this.setState({
      cells: newCells,
      ships: newShips,
      message: newMessage,
    });
  }

  sinkShip(shipIndex, cells) {
    this.shipsSunk += 1;
    this.state.ships[shipIndex].positions.forEach((item) => {
      cells[item[0]][item[1]] = cellStates.sunk;
    });

    return cells;
  }
}
