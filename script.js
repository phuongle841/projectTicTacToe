var events = {
  events: {},
  on: function (eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },
  off: function (eventName, fn) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  },
  emit: function (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function (fn) {
        fn(data);
      });
    }
  },
};

let balls = (function () {
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
        element.addEventListener("click", this.markX.bind(this));
        events.emit("Burst", (count) => {
          console.log(count);
        });
      });
    },
    bindingRelationship: function () {
      this.boxes.forEach((element) => {});
    },
    // event when user click
    markX: function (e) {
      e.target.classList.add("marked");
      let XLeft = this.createElement("div", "markLeft");
      let XRight = this.createElement("div", "markRight");
      e.target.appendChild(XLeft);
      e.target.appendChild(XRight);
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
  // this can be use to append some
  initUI.cacheDOM();
  initUI.createBoxes();
  initUI.bindingEvents();
  function setPosition(position, type) {
    console.log(position, type);
  }
  return { setPosition };
})();

events.on("Burst", 3);
var initLogic = {
  reset: function () {},
  addX: function () {},
  addO: function () {},
  checkWinner: function () {},
};
