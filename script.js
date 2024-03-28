const Player = function () {};
const initLogic = (function () {
  const board = [
    ["1", "1", "1"],
    ["1", "1", "1"],
    ["1", "1", "1"],
  ];
  const player1 = Player;
  const player2 = Player;

  const turn = [player1, player2];
  function reset(area) {}
  function add(number, type) {
    let [X, Y] = toCoordinate(number);

    console.log(board[X][Y]);
  }
  function toCoordinate(number) {
    let X = Math.floor(number / 3);
    let Y = number - 3 * X;
    return [X, Y];
  }
  function checkWinner(params) {}
  return { add: add };
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
        element.addEventListener("click", this.markX.bind(this), {
          once: true,
        });
      });
    },
    bindingRelationship: function () {
      this.boxes.forEach((element) => {});
    },
    // event when user click
    markX: function (e) {
      if (e.target.dataset.number) {
        e.target.classList.add("marked");
        let XLeft = this.createElement("div", "markLeft");
        let XRight = this.createElement("div", "markRight");
        e.target.appendChild(XLeft);
        e.target.appendChild(XRight);
        initLogic.add(e.target.dataset.number, "X");
      }
    },
    markO: function (e) {
      e.target.classList.add("marked");
      let innerO = this.createElement("div", "markIn");
      let outerO = this.createElement("div", "markOut");
      e.target.appendChild(innerO);
      e.target.appendChild(outerO);
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
