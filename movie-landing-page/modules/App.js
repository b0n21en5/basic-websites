import Movie from "./Movie.js";

export default class App {
  #data;
  #displayTarget;

  /**
   * @param {Array} data - movie data
   * @param {HTMLElement} displayTarget - main element
   */

  constructor(data, displayTarget) {
    this.#data = data;
    this.#displayTarget = displayTarget;
  }

  /**
   *
   * @param {Object} movies - movie data to display
   */

  displayMovies(movies = this.#data) {
    let ul = document.createElement("ul");

    for (let movie of movies) {
      let obj = new Movie(movie);
      let movieObj = obj.createElementMain();

      let li = document.createElement("li");
      li.appendChild(movieObj);
      ul.appendChild(li);
    }

    this.#displayTarget.replaceChildren(ul);
  }
}
