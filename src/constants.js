export const rowsCount = 10;
export const columnsCount = 10;

export const cellStates = {
  initial: {
    value: 0,
    cssClass: 'cell--initial',
  },
  miss: {
    value: 1,
    cssClass: 'cell--miss',
  },
  hit: {
    value: 2,
    cssClass: 'cell--hit',
  },
  sunk: {
    value: 3,
    cssClass: 'cell--sunk',
  },
};

export const messages = {
  initial: '',
  miss: 'You missed...',
  hit: 'You hit!',
  sunk: 'Wow, you sunk the ship!',
  win: 'You won! Congratulations!',
};
