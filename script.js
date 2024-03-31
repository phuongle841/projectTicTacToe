const Player = function (name) {
  this.name = name;
  function getName() {
    return this.name;
  }
  return { getName: getName };
};
const initLogic = (function () {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  let turn = false;
  function returnTurn() {
    turn ? (turn = false) : (turn = true);
    return turn;
  }
  function reset(area) {}
  function add(number, type) {
    let [X, Y] = toCoordinate(number);
    board[X][Y] = type;
    console.log(board);
  }
  function toCoordinate(number) {
    let X = Math.floor(number / 3);
    let Y = number - board.length * X;
    return [X, Y];
  }
  function checkWinner(params) {}
  return { add: add, returnTurn: returnTurn };
})();

let UI = (function () {
  const initUI = {
    boxes: [],
    cacheDOM: function () {
      this.container = document.querySelector(".container");
    },
    createBoxes: function () {
      for (let index = 0; index < 1; index++) {
        const element = (9)[index];
        let box = document.createElement("div");
        this.boxes.push(box);
        box.dataset.number = index;
        this.container.appendChild(box);
      }
    },
    bindingEvents: function () {
      this.boxes.forEach((element) => {
        // add eventListener
        element.classList.add("box");
        element.addEventListener(
          "click",
          initLogic.returnTurn()
            ? this.markO.bind(this)
            : this.markX.bind(this),
          {
            once: false,
          }
        );
      });
    },
    bindingRelationship: function () {
      this.boxes.forEach((element) => {});
    },
    // event when user click
    turnEvent: function (e) {
      let turn = initLogic.returnTurn();
      let box = e.target;
      console.log(box);
      !turn ? this.markX(box) : this.markO.bind(this);
    },
    markX: function (e) {
      if (e.target.dataset.number) {
        e.target.classList.add("marked");
        let XLeft = this.createElement("div", "markLeft");
        let XRight = this.createElement("div", "markRight");
        e.target.appendChild(XLeft);
        e.target.appendChild(XRight);
        initLogic.add(e.target.dataset.number, "X");
        console.log(initLogic.returnTurn());
      }
    },
    markO: function (e) {
      if (e.target.dataset.number) {
        e.target.classList.add("marked");
        let innerO = this.createElement("div", "markIn");
        let outerO = this.createElement("div", "markOut");
        e.target.appendChild(innerO);
        e.target.appendChild(outerO);
        initLogic.add(e.target.dataset.number, "O");
      }
    },
    createElement: function (type, className) {
      let element = document.createElement(type);
      element.classList.add(className);
      return element;
    },
    getBoxes: function () {
      return this.boxes;
    },
  };
  initUI.cacheDOM();
  initUI.createBoxes();
  initUI.bindingEvents();
})();
let boardFactory = function () {
  let factory = [];
  let cellNumber = 9;
  function createBoard() {
    let board = createobject();
    board.entity.addEventListener("click", calculateClickPoint);
    board.entity.style.width = "600px";
    board.entity.style.height = "600px";
    board.entity.style.backgroundColor = "#69cc4b";

    document.body.appendChild(board.entity);
  }
  function calculateClickPoint(e) {
    console.log(e.offsetX);
    console.log(e.offsetY);
    return;
  }
  function addCell(cell) {
    factory.push(cell);
  }
  function markCell(number, type) {
    if (number > 0 && number < cellNumber) {
      factory[8].mark(type);
    } else if (number < 0) {
      console.log("number under-defined");
    } else if (number > cellNumber) {
      console.log("number over-defined");
    } else {
      console.log("undefined number");
    }
  }
  function display() {
    createBoard();
    return factory;
  }
  return { addCell: addCell, markCell: markCell, display: display };
};

let cell = function (number) {
  this.entity = createobject();
  this.number = number;
  function mark(type) {
    if (type == "X") {
      entity.entity.style.height = "180px";
      entity.entity.style.width = "180px";
    } else if (type == "O") {
      console.log(type);
    } else {
      console.log("undefined typed");
    }
  }
  return { mark: mark };
};
let createobject = function () {
  let entity = document.createElement("div");
  return { entity: entity };
};
// the process create  board
// create cell hold the object and add x or o into them
let board = boardFactory();
for (let index = 0; index < 9; index++) {
  let cellInstance = cell(index);
  board.addCell(cellInstance);
}
board.display();
