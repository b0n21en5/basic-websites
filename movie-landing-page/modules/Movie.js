export default class Movie {
  #title;
  #year;
  #producer;
  #director;
  #image;

  /**
   * @param {Object} data - movie data
   *
   */

  constructor(data) {
    this.#title = data.title;
    this.#producer = data.producer;
    this.#director = data.director;
    this.#year = data.release_date;
    this.#image = data.image;
  }

  /**
   * @returns {HTMLElement}
   */

  createElementMain() {
    let articleEl = document.createElement("article");

    articleEl.innerHTML = `
        <img src=${this.#image} alt="movie banner"/>
        <ul>
            <li><h2>${this.#title}</h2></li>
            <li><span>Year released:</span> ${this.#year}</li>
            <li><span>Producer:</span> ${this.#producer}</li>
            <li><span>Director:</span> ${this.#director}</li>
        </ul>
        `;
    return articleEl;
  }
}
