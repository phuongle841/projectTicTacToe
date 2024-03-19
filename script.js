console.log("this is totally normal");
(function () {
  const people = {
    people: ["will", "liam"],
    init: function () {
      this.cacheDom();
      this.render();
    },
    cacheDom: function () {
      this.body = document.querySelector("body");
      this.container = this.body.querySelector(".container");
      console.log(this.body);
      console.log(this.container);
    },
    render: function () {
      const data = { people: this.people };
      console.log(data);
    },
  };
  people.init();
})();
