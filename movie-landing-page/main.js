import data from "./data/ghibli.js";
import App from "./modules/App.js";

let main = document.querySelector("main");

let app = new App(data, main);

app.displayMovies();
