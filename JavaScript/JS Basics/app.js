const openAddMovieBtn = document.getElementById("add-movie");

const addMovieModel = document.getElementById("add-movie-model");

const backdrop = document.getElementById("backdrop");

const cancelButton = addMovieModel.querySelector(".cancel");

const addMovieButton = cancelButton.previousElementSibling;

const inputs = document.getElementsByTagName("input");

const noMovies = document.getElementById("no-movies");
const ul = document.getElementById("movies-list");

const confirmDeleteModel = document.getElementById("confirm-delete");
let yesBtn = confirmDeleteModel.querySelector(".yes");
const noBtn = confirmDeleteModel.querySelector(".no");

let movies = [];

function handleDeleteMovie(id) {
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  movies.splice(movieIndex, 1);

  ul.children[movieIndex].remove();
  updateMovies();
}

const closeDeleteModel = () => {
  confirmDeleteModel.classList.remove("visible");
};

function deleteConfirmator(id) {
  confirmDeleteModel.classList.add("visible");

  yesBtn.replaceWith(yesBtn.cloneNode(true));

  yesBtn = confirmDeleteModel.querySelector(".yes");

  noBtn.removeEventListener("click", closeDeleteModel);
  noBtn.addEventListener("click", closeDeleteModel);
  yesBtn.addEventListener("click", () => {
    handleDeleteMovie(id);
    closeDeleteModel();
  });
}

function renderNewMovie(movie) {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie";
  newMovieElement.innerHTML = `
  <div>
    <image src="${movie.imageUrl}" alt="${movie.title}" />
  </div>
  <div class="movie-info">
      <div>
        <p class="text">${movie.title}</p>
      </div>
      <div>
        <p class="star">${movie.rating}/5 rating</p>
      </div>
    </div>
  `;

  newMovieElement.addEventListener(
    "click",
    deleteConfirmator.bind(null, movie.id)
  );

  ul.append(newMovieElement);
}

function updateMovies() {
  if (movies.length === 0) {
    noMovies.style.display = "block";
  } else {
    noMovies.style.display = "none";
  }
}

function toggleModel() {
  addMovieModel.classList.toggle("visible");
  backdrop.classList.toggle("visible");
}

function clearInputFields() {
  for (const input of inputs) {
    input.value = "";
  }
}

function addMovieHandler() {
  let id = new Date().toISOString();
  let title = inputs[0].value;
  let imageUrl = inputs[1].value;
  let rating = inputs[2].value;

  if (
    title.trim() === "" ||
    imageUrl.trim() === "" ||
    +rating < 1 ||
    +rating > 5
  ) {
    alert("Please enter valid values!");
    return;
  }
  const newMovie = {
    id: id,
    title: title,
    imageUrl: imageUrl,
    rating: rating,
  };

  movies.push(newMovie);
  toggleModel();
  clearInputFields();
  renderNewMovie(newMovie);
  updateMovies();
}

openAddMovieBtn.addEventListener("click", toggleModel);

backdrop.addEventListener("click", toggleModel);

cancelButton.addEventListener("click", () => {
  toggleModel();
  clearInputFields();
});

addMovieButton.addEventListener("click", addMovieHandler);
