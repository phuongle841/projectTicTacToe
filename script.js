function myCell() {
  let value = 0;

  function addSign(player) {
    value = player;
  }

  function getValue() {
    return value;
  }

  return { addSign, getValue };
}
function myGameBoar() {
  const rows = 3;
  const columns = 3;
  let board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(myCell());
    }
  }
  function getBoard() {
    return board;
  }

  function dropSign(row, column, player) {
    if (board[row][column].getValue() === 0) {
      board[row][column].addSign(player);
      return true;
    } else {
      return false;
    }
  }

  function printBoard() {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => {
        return cell.getValue();
      })
    );
    return boardWithCellValues;
  }

  function clearBoard() {
    board = [];
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(myCell());
      }
    }
  }

  return { getBoard, dropSign, printBoard, clearBoard };
}
function myGameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = myGameBoar();
  let countDown = 0;
  const player = [
    { name: playerOneName, Sign: 1 },
    { name: playerTwoName, Sign: 2 },
  ];
  let activePlayer = player[0];

  function switchPlayerTurn() {
    activePlayer = activePlayer === player[0] ? player[1] : player[0];
  }
  function getActivePlayer() {
    return activePlayer;
  }
  function printNewRound() {
    board.printBoard();
  }
  function playRound(row, column) {
    let availableCells = board.dropSign(row, column, getActivePlayer().Sign);
    if (availableCells) {
      //  get winner
      countDown++;
      let wining = winingCondition(
        row,
        column,
        getActivePlayer().Sign,
        countDown
      );
      if (wining === "notWin") {
        switchPlayerTurn();
        printNewRound();
        return;
      } else if (wining === "win") {
        let winner = getActivePlayer().name;
        activePlayer = player[0];
        board.clearBoard();
        return winner;
      } else if (wining === "draw") {
        activePlayer = player[0];
        board.clearBoard();
        return;
      }
    }
  }
  function winingCondition(row, column, Sign, countDown) {
    let currentBoard = board.printBoard();
    let state = ["draw", "win", "notWin"];
    let wining;
    // check row
    for (let i = 0; i < 3; i++) {
      if (currentBoard[row][i] != Sign) {
        wining = state[2];
        break;
      }
      if (i == 3 - 1) {
        wining = state[1];
      }
    }
    // check column
    for (let i = 0; i < 3; i++) {
      if (currentBoard[i][column] != Sign) {
        wining = state[2];
        break;
      }
      if (i == 3 - 1) {
        wining = state[1];
      }
    }
    // check diagonal
    if (row == column) {
      for (let i = 0; i < 3; i++) {
        if (currentBoard[i][i] != Sign) {
          wining = state[2];
          break;
        }
        if (i == 3 - 1) {
          wining = state[1];
        }
      }
    }
    // check anti-diagonal
    if (+row + +column == 3 - 1) {
      for (let i = 0; i < 3; i++) {
        if (currentBoard[i][3 - 1 - i] != Sign) {
          wining = state[2];
          break;
        }
        if (i == 3 - 1) {
          wining = state[1];
        }
      }
    }
    if (countDown == 3 * 3) {
      wining = state[0];
    }
    return wining;
  }

  printNewRound();
  return { playRound, getActivePlayer, getBoard: board.getBoard };
}
function myScreenController() {
  const game = myGameController();
  const boardDiv = document.querySelector(".myBoard");
  const playerTurnDiv = document.querySelector(".myTurn");
  const winnerBanner = document.querySelector(".myWinner");

  function updateScreen() {
    boardDiv.textContent = "";

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

    board.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("myCell");
        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = columnIndex;
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
      });
    });
  }

  function clickHandlerBoard(e) {
    const selectedCellColumn = e.target.dataset.column;
    const selectedCellRow = e.target.dataset.row;
    if (!selectedCellColumn || !selectedCellRow) {
      return;
    }
    let wining = game.playRound(selectedCellRow, selectedCellColumn);
    if (wining != undefined) {
      winnerBanner.textContent = `winner: ${wining}`;
    }
    updateScreen();
  }

  boardDiv.addEventListener("click", clickHandlerBoard);
  updateScreen();
}

myScreenController();
