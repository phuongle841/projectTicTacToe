console.log("this is totally normal");
(function () {
  const people = {
    people: ["will", "liam"],
    init: function () {
      this.cacheDom();
      this.render();
      this.bindEvent();
    },
    cacheDom: function () {
      this.body = document.querySelector("body");
      this.container = this.body.querySelector(".container");
      this.input = this.container.querySelector("input");
      this.output = this.container.querySelector(".output");
      this.button = this.container.querySelector("button");
    },
    bindEvent: function () {
      this.button.addEventListener("click", this.addingPerson.bind(this));
      this.data = this.output.querySelectorAll("div");
      console.log(this.data);
      for (let index = 0; index < this.data.length; index++) {
        const element = this.data[index];
        element.addEventListener("click", this.deletePerson.bind(this));
      }
    },
    render: function () {
      this.output.innerHTML = "";
      for (let index = 0; index < this.people.length; index++) {
        this.output.appendChild(this.createDiv(this.people[index]));
      }
    },
    addingPerson: function () {
      this.people.push(this.input.value);
      this.render();
      this.input.value = "";
    },
    createDiv: function (person) {
      const functions = {
        init: function () {
          this.create();
          this.bindContent();
          this.bindEvent();
          this.append();
          return this.Output;
        },
        create: function () {
          this.Output = document.createElement("div");
          this.p = document.createElement("p");
          this.closeButton = document.createElement("button");
        },
        append: function () {
          this.Output.appendChild(this.p);
          this.Output.appendChild(this.closeButton);
        },
        bindContent: function () {
          this.p.innerHTML = `${person}`;
          this.closeButton.innerHTML = "X";
        },
        bindEvent: function () {
          this.closeButton.addEventListener("click", this.KYS.bind(this));
        },
        KYS: function (e) {
          // console.log(this.Output);
          // this.Output.remove();
        },
      };
      let Output = functions.init(person);
      return Output;
    },
    deletePerson: function (e) {
      console.log(e.target.closest("div"));
      console.log(this.output);
    },
  };
  people.init();
})();
