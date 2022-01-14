"use strict";

const gameboard = (() => {
  const board = new Array(9).fill("", 0, 9);
  const getBoard = () => {
    return board;
  };
  const setCell = (index, type) => {
    board[index] = type;
  };

  return { getBoard, setCell };
})();

const game = (() => {})();

const displayController = (() => {
  const gameboardCells = Array.from(document.querySelectorAll(".content"));
  const fillCells = (board) => {
    gameboardCells.forEach((cell) => {
      const [index] = /\d+/.exec(cell.id);
      cell.textContent = board[index];
    });
  };
  return { fillCells };
})();

const Player = (name, type) => {
  const gamePiece = type;
  const getName = () => name;
  const getType = () => type;

  const takeTurn = () => {
    console.log(`${name} it is your turn!`);
  };

  return { getName, getType, takeTurn };
};

// const player1 = Player("henry", "x");
// player1.takeTurn();

gameboard.setCell(8, "X");
gameboard.setCell(1, "0");
gameboard.setCell(0, "0");
gameboard.setCell(5, "X");
gameboard.setCell(2, "X");
gameboard.setCell(6, "0");
console.log(gameboard.getBoard());
displayController.fillCells(gameboard.getBoard());
