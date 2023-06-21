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
    this.#year = data.release_year;
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
            <li><span>Year released: ${this.#year}</span></li>
            <li><span>Producer: ${this.#producer}</span></li>
            <li<span>Director: ${this.#director}</span>></li>
        </ul>
        `;
    return articleEl;
  }
}
