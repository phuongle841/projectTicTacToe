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
  const board = [];

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

  return { getBoard, dropSign, printBoard };
}
function myGameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = myGameBoar();
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
      winingCondition(row, column, getActivePlayer().Sign);

      switchPlayerTurn();
      printNewRound();
    }
  }
  function winingCondition(row, column, Sign) {
    let currentBoard = board.printBoard();

    // check row
    for (let i = 0; i < 3; i++) {
      if (currentBoard[row][i] != Sign) {
        break;
      }
      if (i == 3 - 1) {
        console.log(getActivePlayer().name);
      }
    }
    // check column
    for (let i = 0; i < 3; i++) {
      if (currentBoard[i][column] != Sign) {
        break;
      }
      if (i == 3 - 1) {
        console.log(getActivePlayer().name);
      }
    }
    // check diagonal
    if (row == column) {
      for (let i = 0; i < 3; i++) {
        if (currentBoard[i][i] != Sign) {
          break;
        }
        if (i == 3 - 1) {
          console.log(getActivePlayer().name);
        }
      }
    }
    // check anti-diagonal

    if (row + column == 2) {
      // why
    }
  }
  printNewRound();
  return { playRound, getActivePlayer, getBoard: board.getBoard };
}
function myScreenController() {
  const game = myGameController();
  const playerTurnDiv = document.querySelector(".myTurn");
  const boardDiv = document.querySelector(".myBoard");

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
    game.playRound(selectedCellRow, selectedCellColumn);
    updateScreen();
  }

  boardDiv.addEventListener("click", clickHandlerBoard);
  updateScreen();
}
myScreenController();

// ===================================
function Cell() {
  let value = 0;

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    addToken,
    getValue,
  };
}
function Gameboard() {
  const rows = 6;
  const columns = 7;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const dropToken = (column, player) => {
    const availableCells = board
      .filter((row) => row[column].getValue() === 0)
      .map((row) => row[column]);
    console.log(availableCells);
    if (!availableCells.length) return;

    const lowestRow = availableCells.length - 1;
    board[lowestRow][column].addToken(player);
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => {
        return cell.getValue();
      })
    );
  };

  return { getBoard, dropToken, printBoard };
}

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = Gameboard();

  const players = [
    {
      name: playerOneName,
      token: 1,
    },
    {
      name: playerTwoName,
      token: 2,
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
  };

  const playRound = (column) => {
    board.dropToken(column, getActivePlayer().token);

    /*  This is where we would check for a winner and handle that logic,
        such as a win message. */

    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
  };
}

function ScreenController() {
  const game = GameController();
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");

  const updateScreen = () => {
    // clear the board
    boardDiv.textContent = "";

    // get the newest version of the board and player turn
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    // Display player's turn
    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

    // Render board squares
    board.forEach((row) => {
      row.forEach((cell, index) => {
        // Anything clickable should be a button!!
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        // Create a data attribute to identify the column
        // This makes it easier to pass into our `playRound` function
        cellButton.dataset.column = index;
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
      });
    });
  };

  // Add event listener for the board
  function clickHandlerBoard(e) {
    const selectedColumn = e.target.dataset.column;
    // Make sure I've clicked a column and not the gaps in between
    if (!selectedColumn) return;

    game.playRound(selectedColumn);
    updateScreen();
  }
  boardDiv.addEventListener("click", clickHandlerBoard);
  updateScreen();
}

ScreenController();
