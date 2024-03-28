const Player = (function (name) {
  this.name = name;
  function getName() {
    return this.name;
  }
  return { getName: getName };
})();
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
      for (let index = 0; index < 9; index++) {
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
