import { cellStates, columnsCount, messages, rowsCount } from './constants';

/**
 * Creates template for game board.
 * @returns {[]} Empty 10x10 array
 */
export function createEmptyCells() {
  const row = new Array(rowsCount).fill(cellStates.initial);
  let result = [row];

  for (let i = 1; i < columnsCount; i += 1) {
    result.push([...row]);
  }

  return result;
}

/**
 * Adds hitCount property to each initial object.
 * @param data Ship objects that should be updated with new prop
 * @returns {*} New array of ship objects
 */
export function createShips(data) {
  return data.map((item) => ({
    ...item,
    hitCount: 0,
  }));
}

/**
 * Returns a string according to cell state.
 * @param cellState
 * @returns {string} String for message bar
 */
export function getMessage(cellState) {
  switch(cellState.value) {
    case 1: return messages.miss;
    case 2: return messages.hit;
    case 3: return messages.sunk;
    case 0:
    default:
      return messages.initial;
  }
}
