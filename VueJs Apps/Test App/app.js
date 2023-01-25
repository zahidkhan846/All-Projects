// const button = document.querySelector("button");
// const ul = document.querySelector("ul");
// const input = document.querySelector("input");

// function addListItem() {
//   const inputValue = input.value;
//   const listItem = document.createElement("li");
//   listItem.textContent = inputValue;
//   ul.append(listItem);
//   input.value = "";
// }

// button.addEventListener("click", addListItem);

Vue.createApp({
  data() {
    return {
      goals: [],
      value: "",
    };
  },
  methods: {
    addGoal() {
      this.goals.push(this.value);
      this.value = "";
    },
  },
}).mount("#app");
