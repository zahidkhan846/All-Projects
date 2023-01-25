import { text } from "../Components/helper";

const hello = (arg) => {
  console.log(arg, text("I am Zahid."));
};

hello("Hello people Its me,");

const names = ["John", "Anna", "Alice"];

const ul = document.querySelector("ul");

for (const name of names) {
  const li = document.createElement("li");
  li.innerHTML = `${name}`;
  ul.appendChild(li);
}
