import React from 'react';
import './Board.css';
import { columnsCount, rowsCount, cellStates } from '../../constants';
import { Square } from '../square/Square';

export class Board extends React.Component {
  state = {
    cells: this.createEmptyCells(),
    ships: this.createShips(this.props.data.layout),
  };

  render() {
    const board = this.state.cells.map((item, i) => this.renderRow(i));

    return (
      <div className="board">
        {board}
      </div>
    )
  }

  renderRow(i) {
    let row = this.state.cells[i].map((item, j) => this.renderSquare(j, i));

    return (
      <div
        className="board-row"
        key={`row-${i}`}
      >
        {row}
      </div>
    )
  };

  renderSquare(i, j) {
    return (
      <Square
        key={`cell-${i}-${j}`}
        onClick={() => this.onCellClick(i, j)}
        className={this.state.cells[i][j].class}
      />
    )
  }

  createEmptyCells() {
    const row = new Array(rowsCount).fill(cellStates.initial);
    let result = [];

    for (let i = 0; i < columnsCount; i += 1) {
      result.push(row.slice());
    }

    return result;
  }

  createShips(data) {
    return data.map((item) => ({
      ...item,
      hitCount: 0,
    }));
  }

  onCellClick = (i, j) => {
    // player cannot hit the cell twice
    if (this.state.cells[i][j].value !== cellStates.initial.value) {
      return;
    }

    this.changeCellState(i, j);
  };

  changeCellState(x, y) {
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
  }

  // TODO: add computer messages below game board

  updateBoardState(i, j, state, shipIndex) {
    const newShips = [...this.state.ships];
    let newCells = [...this.state.cells];
    newCells[i][j] = state;

    if (shipIndex != null) {
      const currentShip = newShips[shipIndex];
      currentShip.hitCount += 1;

      // check if this ship should be sunk
      if (currentShip.hitCount === currentShip.positions.length) {
        newCells = this.sinkShip(shipIndex, newCells);
      }
    }

    this.setState({
      cells: newCells,
      ships: newShips,
    });
  }

  sinkShip(shipIndex, cells) {
    this.state.ships[shipIndex].positions.forEach((item) => {
      cells[item[0]][item[1]] = cellStates.sunk;
    });

    return cells;
  }
}
