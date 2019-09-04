document.addEventListener("DOMContentLoaded", start);

function start() {
  "use strict";

  let indlæg = []; // variablen "indlæg" er nu et array

  async function hentJson1() {
    // i denne variabel hentes json dataen ind

    console.log("hent json 1");
    // definerer "url" til at være et link (med json data)
    let url = "http://petlatkea.dk/2019/students1991.json";

    let myJson = await fetch(url); // henter (fetcher) dataen fra "url" og sætter det ind i variablen "myJson"

    indlæg = await myJson.json(); // skal fetche dataen som json data og lægges ind i indlæg arrayet

    visBlogindlæg(); // kalder næste funktion
  }

  function visBlogindlæg() {
    // i denne funktion vises indhold i html
    console.log("VIS DET SKER");

    let dest = document.querySelector(".blogindlaeg"); // definerer variablen "dest" til at være .blogindlaeg i html dokumentet
    let temp = document.querySelector("template"); // definerer varibalen "temp" til at være templaten i html dokumentet

    indlæg.forEach(indlæg => {
      // gennemløber arrayet
      let klon = temp.cloneNode(true).content; // variablen "klon" kloner nu "temp" (templaten) fra html

      klon.querySelector(".name").innerHTML = indlæg.fullname; // inde i templaten, skal elementet med class'en .dato have content med endpoint dato fra                                                                  json-dataen

      klon.querySelector(".house").innerHTML = indlæg.house; // samme som ovenstående

      dest.appendChild(klon); // kloner til dest (.blogindlaeg)
    });
  }

  hentJson1();
}
