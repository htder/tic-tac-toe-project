"use strict";
const Player = (name, type, position) => {
  const playerContainer = document.querySelector(`.player${position}`);
  const playerName = document.querySelector(`.player${position}-name`);
  const playerType = document.querySelector(`.player${position}-type`);
  let gamePiece = type;
  const getName = () => name;
  const getType = () => gamePiece;

  const setType = (type) => {
    gamePiece = type;
  };

  const setDomText = () => {
    playerName.textContent = name;
    playerType.textContent = type;
  };

  return { getName, getType, setDomText, setType };
};

let player1;
let player2;

const game = ((player1, player2) => {})(player1, player2);

const displayController = (() => {
  const winnerModal = document.querySelector(".modal-again");
  const winnerText = document.querySelector(".form-field-again");
  const winnerModalBtn = document.querySelector(".again");
  const modal = document.querySelector(".modal");
  const play = document.querySelector(".submit");
  const form = document.getElementById("form");
  const player1NameEl = document.querySelector("#player1");
  const player2NameEl = document.querySelector("#player2");
  const player1Type = document.querySelector(".player1-type");
  const player2Type = document.querySelector(".player2-type");
  console.log(player1Type);
  console.log(player2Type);

  const fillCells = () => {
    gameboard.getCells().forEach((cell) => {
      const [index] = /\d+/.exec(cell.id);
      cell.textContent = gameboard.getBoard()[index];
    });
  };

  const validateForm = () => {
    let player1Valid = modalHelper.checkName(player1NameEl),
      player2Valid = modalHelper.checkName(player2NameEl);

    let isFormValid = player1Valid && player2Valid;
    if (isFormValid) {
      player1 = Player(player1NameEl.value.trim(), "X", 1);
      player2 = Player(player2NameEl.value.trim(), "O", 2);
      player1.setDomText();
      player2.setDomText();
      gameboard.setPlayers(player1, player2);
      modalHelper.clearForm(form);
      modalHelper.hideModal(modal);
    }
  };

  const playListener = () => {
    play.addEventListener("click", (event) => {
      event.preventDefault();
      validateForm();
    });
  };

  const showPlayAgain = () => {
    console.log(winnerModal);
    winnerModal.style.display = "block";
  };

  const setWinnerText = (text) => {
    winnerText.textContent = text;
  };

  const playAgainListener = () => {
    winnerModalBtn.addEventListener("click", () => {
      const player1TypeValue = player1.getType();
      const player2TypeValue = player2.getType();
      player1.setType(player2TypeValue);
      player2.setType(player1TypeValue);
      player1Type.textContent = player1.getType();
      player2Type.textContent = player2.getType();
      gameboard.setLastPlayed();
      winnerModal.style.display = "none";
      return;
    });
  };

  return {
    fillCells,
    playListener,
    showPlayAgain,
    setWinnerText,
    playAgainListener,
  };
})();

const modalHelper = (() => {
  const isRequired = (value) => {
    return value === "";
  };

  const showError = (input, message) => {
    input.classList.remove("success");
    input.classList.add("error");

    const formField = input.parentElement;
    const error = formField.querySelector("small");
    error.textContent = message;
  };

  const showSuccess = (input) => {
    const formField = input.parentElement;
    input.classList.remove("error");
    input.classList.add("success");

    const error = formField.querySelector("small");
    error.textContent = "";
  };

  const checkName = (element) => {
    let valid = false;
    const title = element.value.trim();
    if (isRequired(title)) {
      showError(element, "Name cannot be empty.");
    } else {
      showSuccess(element);
      valid = true;
    }
    return valid;
  };

  const clearForm = (form) => {
    form["player1"].value = "";
    form["player2"].value = "";
  };

  const hideModal = (modal) => {
    modal.style.display = "none";
  };

  const showModal = (modal) => {
    modal.style.display = "block";
    document.querySelector(".focus").focus();
  };

  return { checkName, clearForm, hideModal, showModal };
})();

displayController.playListener();

const gameboard = (() => {
  let lastPlayed = "";
  let playerTurn = true;
  let players;
  let board = new Array(9).fill("", 0, 9);
  const gameboardCells = Array.from(document.querySelectorAll(".content"));

  const clearBoard = () => {
    board = new Array(9).fill("", 0, 9);
    displayController.fillCells();
  };

  const getCells = () => {
    return gameboardCells;
  };
  const getBoard = () => {
    return board;
  };
  const setCell = (index, type) => {
    board[index] = type;
  };

  const setPlayerTurn = () => {
    playerTurn = true;
  };

  const chooseCell = (event) => {
    const cell = Array.from(event.target.childNodes)[1];
    const [index] = /\d+/.exec(cell.id);
    if (board[index] === "") {
      let type;
      if (lastPlayed === "") {
        type = "X";
        lastPlayed = "X";
      } else if (lastPlayed === "X") {
        type = "O";
        lastPlayed = "O";
      } else {
        type = "X";
        lastPlayed = "X";
      }

      //   const type = players[playerTurn ? 0 : 1].getType();
      cell.textContent = type;
      playerTurn = !playerTurn;
      board[index] = type;
      const winner = checkWinner();
      if (winner === "") {
        return;
      }
      setWinner(winner);
      clearBoard();
      displayController.showPlayAgain();
      displayController.playAgainListener();
    }
  };

  const setLastPlayed = () => {
    lastPlayed = "";
  };

  const setPlayers = (player1, player2) => {
    if (player1.getType() === "X") {
      players = [player1, player2];
    } else {
      players = [player2, player1];
    }
  };

  const playAgain = () => {
    clearBoard();
    displayController.fillCells();
    takeTurn();
  };

  const takeTurn = () => {
    gameboardCells.forEach((cell) => {
      cell.parentNode.addEventListener("click", chooseCell);
    });
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
      return board[0];
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
      displayController.setWinnerText("It's a draw!");
    }
    if (type === player1.getType()) {
      displayController.setWinnerText(`${player1.getName()} has won!`);
    }
    if (type === player2.getType()) {
      displayController.setWinnerText(`${player2.getName()} has won!`);
    }
  };

  return {
    getBoard,
    setCell,
    getCells,
    takeTurn,
    setPlayers,
    setPlayerTurn,
    setLastPlayed,
  };
})();

displayController.fillCells(gameboard);
gameboard.takeTurn();
