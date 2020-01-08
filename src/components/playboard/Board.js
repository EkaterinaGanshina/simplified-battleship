import React from 'react';
import './Board.css';
import { columnsCount, rowsCount, cellStates } from '../../constants';

const Square = (props) => (
  <button
    className={`board-cell ${props.className}`}
    onClick={props.onClick}
  />
);

export class Board extends React.Component {
  state = {
    cells: this.createEmptyCells(),
    ships: this.createShips(this.props.data.layout),
  };

  render() {
    let board = [];

    for (let i = 0; i < rowsCount; i += 1) {
      board.push(this.renderRow(i));
    }

    return (
      <div className="board">
        {board}
      </div>
    )
  }

  renderRow(i) {
    let row = [];

    for (let j = 0; j < columnsCount; j += 1) {
      row.push(this.renderSquare(j, i));
    }

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

    this.checkCellState(i, j);
  };

  checkCellState(x, y) {
    const { ships } = this.state;
    let cellFound = false;

    for (let i = 0; i < ships.length; i += 1) {
      const { positions } = ships[i];

      for (let j = 0; j < positions.length; j += 1) {
        if (positions[j][0] === x && positions[j][1] === y) {
          this.updateBoardState(x, y, cellStates.hit);
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

  updateBoardState(i, j, value) {
    let newCells = this.state.cells.slice();
    newCells[i][j] = value;

    this.setState({
      cells: newCells,
    });
  }
}
