import React from 'react';
import './Board.css';
import { cellStates } from '../../constants';
import { Square } from '../square/Square';

export class Board extends React.Component {
  render() {
    const board = this.props.cells.map((item, i) => this.renderRow(i));

    return (
      <div className="board">
        {board}
      </div>
    )
  }

  renderRow(i) {
    let row = this.props.cells[i].map((item, j) => this.renderSquare(j, i));

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
        onClick={() => this.handleClick(i, j)}
        className={this.props.cells[i][j].cssClass}
      />
    )
  }

  handleClick = (i, j) => {
    // player cannot hit the cell twice
    if (this.props.cells[i][j].value !== cellStates.initial.value) {
      return;
    }

    this.props.onCellClick(i, j);
  };
}
