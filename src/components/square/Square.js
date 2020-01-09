import React from 'react';
import './Square.css';

export const Square = (props) => (
  <button
    className={`board-cell ${props.className}`}
    onClick={props.onClick}
  />
);
