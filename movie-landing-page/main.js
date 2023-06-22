import data from "./data/ghibli.js";
import App from "./modules/App.js";

const main = document.querySelector("main");

const app = new App(data, main);

app.displayMovies();

// default display view as grid
const defaultView = document.querySelector("#display input:checked").value;
app.setView(defaultView);

// display view change
let newView = document.querySelectorAll("#display input");
newView.forEach((view) => {
  view.addEventListener("change", () => {
    app.setView(view.value);
  });
});

// search movies from search input value
const searchInput = document.querySelector("#search input");
const submitBtn = document.querySelector("#search button[type='submit']");
const resetBtn = document.querySelector("#search button[type='reset']");

submitBtn.addEventListener("click", (element) => {
  element.preventDefault();

  let searchString = searchInput.value;
  app.searchMovies(searchString);
});

resetBtn.addEventListener("click", () => {
  app.searchMovies("");
});

// sort movies with given terms
const sortSelect = document.querySelector("select[name='sort']");
app.sortMovies(sortSelect.value);

sortSelect.addEventListener("change", () => {
  app.sortMovies(sortSelect.value);
});

// filter movies
const filterInput = document.querySelector("#filter");

const filterByDirector = app.createFilter("director");
const filterByProducer = app.createFilter("producer");

filterInput.appendChild(filterByDirector);
filterInput.appendChild(filterByProducer);
