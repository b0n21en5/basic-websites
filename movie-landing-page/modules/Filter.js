export default class Filter {
  #filterValue;

  /**
   * @param {String} filterValue - data parameter
   * @param {}
   */

  constructor(filterValue) {
    this.#filterValue = filterValue;
  }

  createFilterCheckbox() {
    let inputEl = document.createElement("label");

    inputEl.innerHTML = `
        <input type="checkbox" /> ${this.#filterValue}
    `;
    return inputEl;
  }
}
