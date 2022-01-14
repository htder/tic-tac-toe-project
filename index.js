"use strict";
const Player = (name, type, position) => {
  const playerContainer = document.querySelector(`.player${position}`);
  const playerName = document.querySelector(`.player${position}-name`);
  const playerType = document.querySelector(`.player${position}-type`);
  const gamePiece = type;
  const getName = () => name;
  const getType = () => type;

  const setDomText = () => {
    playerName.textContent = name;
    playerType.textContent = type;
  };

  return { getName, getType, setDomText };
};

const player1 = Player("Player 1", "X", 1);
player1.setDomText();
const player2 = Player("Player 2", "0", 2);
player2.setDomText();

const gameboard = ((player1, player2) => {
  let playerTurn = true;
  const players = [player1, player2];
  const board = new Array(9).fill("", 0, 9);
  const gameboardCells = Array.from(document.querySelectorAll(".content"));
  const winnerContainer = document.querySelector(".winner");

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
        const [index] = /\d+/.exec(cell.id);
        if (board[index] === "") {
          const type = players[playerTurn ? 0 : 1].getType();
          cell.textContent = type;
          playerTurn = !playerTurn;
          board[index] = type;
          const winner = checkWinner();
          if (winner === "") return;
          setWinner(winner);
          return;
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

  const setWinner = (type) => {
    if (type === "") return;
    if (type === "draw") {
      winnerContainer.style.opacity = 1;
      winnerContainer.textContent = "It's a draw!";
    }
    if (type === player1.getType()) {
      winnerContainer.style.opacity = 1;
      winnerContainer.textContent = `${player1.getName()} has won!`;
    }
    if (type === player2.getType()) {
      winnerContainer.style.opacity = 1;
      winnerContainer.textContent = `${player2.getName()} has won!`;
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
