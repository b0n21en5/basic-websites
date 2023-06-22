import Movie from "./Movie.js";
import Filter from "./Filter.js";

export default class App {
  #data;
  #displayTarget;
  #currentView;

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

  /**
   * @param {"grid" | "list"} newView - set view parameter
   */

  setView(newView) {
    this.#displayTarget.classList.remove(this.#currentView);
    this.#displayTarget.classList.add(newView);

    this.#currentView = newView;
  }

  /**
   * @param {String} searchString - search result paramter
   */

  searchMovies(searchString) {
    let formattedSearchString = searchString.toLowerCase().trim();

    let results = this.#data.filter(
      (movie) =>
        movie.title.toLowerCase().includes(formattedSearchString) ||
        movie.director.toLowerCase().includes(formattedSearchString) ||
        movie.producer.toLowerCase().includes(formattedSearchString) ||
        movie.release_date.toLowerCase().includes(formattedSearchString)
    );

    this.displayMovies(results);
  }

  /**
   * @param {"titleAsc" || "titleDes" || "yearAsc" || "yearDes"} order - sort movies by sort term
   */

  sortMovies(order) {
    let results;

    switch (order) {
      case "titleAsc":
        results = this.#data.sort((movieA, movieB) =>
          movieA.title.localeCompare(movieB.title)
        );
        break;

      case "titleDes":
        results = this.#data.sort((movieA, movieB) =>
          movieB.title.localeCompare(movieA.title)
        );
        break;

      case "yearAsc":
        results = this.#data.sort(
          (movieA, movieB) =>
            Number(movieA.release_date) - Number(movieB.release_date)
        );
        break;

      case "yearDes":
        results = this.#data.sort(
          (movieA, movieB) =>
            Number(movieB.release_date) - Number(movieA.release_date)
        );
        break;
    }

    this.displayMovies(results);
  }

  // filter movies by director

  /**
   * @param {"director" || "producer"} filterTerm -
   */
  createFilter(filterTerm) {
    let results = document.createElement("fieldset");
    results.innerHTML = `<legend>Filter By ${filterTerm}</legend>`;

    this.#data.forEach((movie) => {
      let obj = new Filter(movie.filterTerm);
      let inputEl = obj.createFilterCheckbox();

      results.appendChild(inputEl);
    });

    return results;
  }
}
