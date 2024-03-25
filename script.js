(function () {
  const initUI = {
    boxes: [],
    cacheDOM: function () {
      container = document.querySelector(".container");
    },
    createBoxes: function () {
      for (let index = 0; index < 6; index++) {
        const element = (6)[index];
        let box = document.createElement("div");
        this.boxes.push(box);
      }
    },
    bindingEvents: function () {
      this.boxes.forEach((element) => {
        // add eventListener
      });
    },
    bindingRelationship: function () {},
  };
  initUI.createBoxes();
  initUI.bindingEvents();
})();
var initLogic = {
  reset: function () {},
  addX: function () {},
  addO: function () {},
  checkWinner: function () {},
};
var mediator = {
  on: function () {},
  off: function () {},
  omit: function () {},
};
