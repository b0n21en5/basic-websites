import allCards from "./data/cards.js";
import { userColumns } from "./data/datatablesource";

const articleCard = document.querySelector("article");

for (let card of allCards) {
  let div = document.createElement("div");
  div.classList.add("card");

  div.innerHTML = `
        <div class="flex">
            <span>${card.title}</span>
            <h1>${card.price}</h1>
            <a href="/">${card.desc}</a>
        </div>
        <div class="flex">
            <p><i class="fa-solid fa-chevron-up fa-sm"></i>&nbsp;20&nbsp;%</p>
            <i class="${card.iClass} card-logo" style="color:${card.iClr};background-color:${card.iBg};"></i>
        </div>
    `;
  articleCard.appendChild(div);

  console.log(card.iClass);
}

const latestTrans = document.getElementById("latest-trans");

for (let col of userColumns) {
  let div = document.createElement("div");
  div.classList.add("trans-data");
}
