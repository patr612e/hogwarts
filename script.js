"use strict";

document.addEventListener("DOMContentLoaded", start);

let indlæg = [];

function start() {
  async function hentJson1() {
    let url = "http://petlatkea.dk/2019/students1991.json";

    let myJson = await fetch(url);

    indlæg = await myJson.json();

    visIndlæg();
  }

  function visIndlæg() {
    let dest = document.querySelector(".blogindlaeg");
    let temp = document.querySelector("template");

    indlæg.forEach(indlæg => {
      let klon = temp.cloneNode(true).content;

      klon.querySelector(".name").innerHTML = indlæg.fullname;

      klon.querySelector(".house").innerHTML = indlæg.house;

      dest.appendChild(klon);
    });
  }

  hentJson1();
}

// SHOWS SELECTED FILTER ON FILTER-MENU

document.querySelectorAll(".filter").forEach(but => {
  but.addEventListener("click", filteringValgt);
});

function filteringValgt() {
  document.querySelectorAll(".filter").forEach(but => {
    but.classList.remove("valgt");
  });
  this.classList.add("valgt");
  filter = this.getAttribute("data-hold");
  filtering();
}

function filtering() {
  // RUNS THROUGH JSON DATA
  // SHOWS ONLY THE DATA OF THE SELECTED FILTER
}

document.querySelectorAll(".sort").forEach(but => {
  but.addEventListener("click", sortingValgt);
});

function sortingValgt() {
  document.querySelectorAll(".sort").forEach(but => {
    but.classList.remove("valgt");
  });
  this.classList.add("valgt");
  sorting();
}
