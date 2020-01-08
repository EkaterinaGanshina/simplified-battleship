import React from 'react';
import './Board.css';
import { columnsCount, rowsCount } from '../../constants';

const Square = (props) => (
  <button
    className="board-cell"
    key={`${props.i}-${props.j}`}
    onClick={props.onClick}
  >
    {props.state}
  </button>
);

export class Board extends React.Component {
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

  renderRow = (i) => {
    let row = [];

    for (let j = 0; j < columnsCount; j += 1) {
      row.push(
        <Square
          i={i}
          j={j}
          onClick={() => false}
          state={''}
        />
      )
    }

    return (
      <div
        className="board-row"
        key={`row-${i}`}
      >
        {row}
      </div>
    )
  }
}
