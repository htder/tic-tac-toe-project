"use strict";
const Player = (name, type) => {
  const gamePiece = type;
  const getName = () => name;
  const getType = () => type;

  return { getName, getType };
};

const player1 = Player("player1", "0");
const player2 = Player("player2", "X");

const gameboard = ((player1, player2) => {
  let playerTurn = true;
  const players = [player1, player2];
  const board = new Array(9).fill("", 0, 9);
  const gameboardCells = Array.from(document.querySelectorAll(".content"));

  const getCells = () => {
    return gameboardCells;
  };
  const getBoard = () => {
    return board;
  };
  const setCell = (index, type) => {
    board[index] = type;
  };

  const takeTurn = () => {
    gameboardCells.forEach((cell) =>
      cell.parentNode.addEventListener("click", () => {
        console.log(cell);
        const [index] = /\d+/.exec(cell.id);
        if (board[index] === "") {
          const type = players[playerTurn ? 0 : 1].getType();
          cell.textContent = type;
          playerTurn = !playerTurn;
          board[index] = type;
          const winner = checkWinner();
          console.log(`${winner} has won`);
        }
      })
    );
  };

  const checkWinner = () => {
    for (let i = 0; i < board.length; i += 3) {
      if (board[i] === board[i + 1] && board[i] === board[i + 2]) {
        return board[i];
      }
    }
    for (let i = 0; i < 3; i++) {
      if (board[i] === board[i + 3] && board[i] === board[i + 6]) {
        return board[i];
      }
    }
    if (board[0] === board[4] && board[0] === board[8]) {
      return board[2];
    }
    if (board[2] === board[4] && board[2] === board[6]) {
      return board[2];
    }
    const isArrayFull = board.filter((x) => x !== "");
    if (isArrayFull.length !== 9) {
      return "";
    } else {
      return "draw";
    }
  };

  return { getBoard, setCell, getCells, takeTurn };
})(player1, player2);

const game = (() => {})();

const displayController = (() => {
  const fillCells = (gameboard) => {
    gameboard.getCells().forEach((cell) => {
      const [index] = /\d+/.exec(cell.id);
      cell.textContent = gameboard.getBoard()[index];
    });
  };
  return { fillCells };
})();

gameboard.setCell(8, "X");
gameboard.setCell(1, "0");
gameboard.setCell(0, "0");
gameboard.setCell(2, "X");
gameboard.setCell(6, "0");
console.log(gameboard.getBoard());
displayController.fillCells(gameboard);
gameboard.takeTurn();
