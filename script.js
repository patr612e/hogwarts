"use strict";

window.addEventListener("DOMContentLoaded", start);

const allStudents = [];
let currentList = [];
let filter;
const expelled = [];

function start() {
  console.log("ready");

  // TODO: Add event-listeners to filter and sort buttons

  document.querySelector(".liste").addEventListener("click", clickSomething);

  document.querySelectorAll(".filter").forEach(elm => {
    elm.addEventListener("click", setFilter);
  });

  loadJSON();
  loadJSONBloodStatus();
}

// unique id https://www.w3resource.com/javascript-exercises/javascript-math-exercise-23.php

function create_UUID() {
  let dt = new Date().getTime();
  let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    let r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

function clickSomething(event) {
  const element = event.target;

  if (element.dataset.action === "remove") {
    console.log("remove button clicked");
    console.log(element);
    element.parentElement.remove();

    const name = element.parentElement.parentElement.firstElementChild.textContent;

    const index = currentList.findIndex(findFunction);

    function findFunction(student) {
      if (student.name === name) {
        return true;
      } else {
        return false;
      }
    }

    console.log(index);
    const slettet = currentList.splice(index, 1);
    expelled.push(slettet[0]);
    displayExpelledList(expelled);
    console.log(slettet);
  }
}

function loadJSON() {
  fetch("http://petlatkea.dk/2019/hogwartsdata/students.json")
    .then(response => response.json())
    .then(jsonData => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  jsonData.forEach(jsonObject => {
    // TODO: Create new object with cleaned data
    const student = Object.create(Student);

    // clean up json data

    const parts = jsonObject.fullname.trim().split(" ");
    const houses = jsonObject.house.trim();

    student.firstName = capitalize(parts[0]);
    student.lastName = capitalize(parts[parts.length - 1]);

    const image = "images/" + student.lastName.toLowerCase() + "_" + student.firstName.substring(0, 1).toLowerCase() + ".png";
    const crest = "crest/" + student.house + ".jpg";

    student.house = capitalize(houses);
    student.gender = jsonObject.gender;
    student.id = create_UUID();
    student.image = image;
    student.crest = crest;
    student.bloodtype = loadJSONBloodStatus();

    if (parts.length === 3) {
      student.middleName = capitalize(parts[1]);
    } else {
      student.middleName = "";
    }

    if (parts.length === 1) {
      student.middleName = "";
      student.lastName = "";
    }

    if (student.lastName.includes("Finch-fletchley")) {
      student.image = "images/flecthley_j.png";
    }

    if (student.lastName.includes() === "-") {
      student.lastName.split("-");
      student.lastName = capitalize([1]);
    }

    student.gender = jsonObject.gender;
    student.id = create_UUID();

    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    console.log(student);

    allStudents.push(student);
  });

  filterList(allStudents);
}

function setFilter() {
  filter = this.dataset.house;
  console.log(setFilter);

  currentList = filtering(filter);
  displayList(currentList);
}

function filtering(house) {
  let filteredlist = allStudents.filter(filterHouse);

  function filterHouse(student) {
    if (student.house === house || house == "all") {
      return true;
    } else {
      return false;
    }
  }

  return filteredlist;
}

function filterList(list) {
  // TODO: Add filtering, according to setting
  const filteredList = list; // right now, just don't filter anything
  sortList(filteredList);
}

function selectSorting(event) {
  const sortBy = event.target.dataset;
  sortListBy(sortBy);
  displayList(currentList);
}

function sortListBy(prop) {
  currentList.sort((a, b) => (a[prop] > b[prop] ? 1 : -1));
}

function sortList(list) {
  // TODO: Sort the list that is received, before displaying it
  displayList(list);
}

function changeHouseColor(student) {
  if (student.house === "Gryffindor") {
    document.querySelector("#modal").style.backgroundColor = rgb(109, 32, 32);
  } else if (student.house === "Slytherin") {
    document.querySelector("#modal").style.backgroundColor = rgb(255, 0, 0);
  } else if (student.house === "Ravenclaw") {
    document.querySelector("#modal").style.backgroundColor = rgb(255, 0, 0);
  } else if (student.house === "Hufflepuff") {
    document.querySelector("#modal").style.backgroundColor = rgb(255, 0, 0);
  }
}

function displayList(students) {
  // clear the list
  document.querySelector(".liste").innerHTML = "";

  // build a new list
  students.forEach(displayStudent);
}

function displayStudent(student) {
  // create clone
  const clone = document.querySelector("template#student").content.cloneNode(true);

  // set clone data

  clone.querySelector(".name").textContent = `${student.firstName} ${student.middleName} ${student.lastName}`;
  clone.querySelector(".house").textContent = student.house;
  clone.querySelector("[data-field=image]").src = student.image;

  clone.querySelector(".popupclick").addEventListener("click", () => {
    displaySingle();
  });

  // append clone to list
  document.querySelector(".liste").appendChild(clone);

  function displaySingle() {
    document.querySelector("#modal").style.display = "block";

    document.querySelector(
      ".popup_name"
    ).textContent = `Fullname: ${student.firstName} ${student.middleName} ${student.lastName}`;
    document.querySelector(".popup_house").textContent = `House: ${student.house}`;
    document.querySelector(".popup_picture").src = student.image;
    document.querySelector(".crest").src = "crest/" + student.house + ".jpg";
    document.querySelector(".bloodstatus").textContent = `Bloodtype: ${student.bloodtype}`;

    document.querySelector("#modal .closebutton").addEventListener("click", close);

    function close() {
      document.querySelector("#modal").style.display = "none";
    }

    changeHouseColor();
  }
}

// Prototype Student
const Student = {
  fullName: "-fullname-",
  firstName: "-firstname-",
  lastName: "-lastname-",
  middleName: "-middlename-",
  house: "-house-",
  gender: "-gender-",
  id: "-id-",
  crest: "-crest-",
  bloodtype: "-bloodtype-"
};

// BLOODSTATUS

function loadJSONBloodStatus() {
  fetch("http://petlatkea.dk/2019/hogwartsdata/families.json")
    .then(response => response.json())
    .then(jsonDataBlood => {
      // when loaded, prepare objects
      prepareObjectsBlood(jsonDataBlood);
    });
}

function prepareObjectsBlood(jsonDataBlood) {
  const blood = Object.create(Blood);

  blood.half = jsonDataBlood.half;
  blood.pure = jsonDataBlood.pure;

  allStudents.forEach(prepareBloodStatus);

  function prepareBloodStatus(student) {
    if (blood.half.includes(`${student.lastName}`)) {
      student.bloodtype = "half-blood";
    }

    if (blood.pure.includes(`${student.lastName}`)) {
      student.bloodtype = "pure-blood";
    }
  }
}

// Prototype Blood
const Blood = {
  half: "-half-",
  pure: "-pure-"
};

// EXPELLED LIST

function displayExpelledList(exStudents) {
  document.querySelector("#expelled tbody").innerHTML = "";

  exStudents.forEach(displayExStudent);
}

function displayExStudent(exStudents) {
  const clone = document.querySelector("template#ex_students").content.cloneNode(true);

  clone.querySelector("[data-expelled=firstname]").textContent = exStudents.firstName;
  clone.querySelector("[data-expelled=lastname]").textContent = exStudents.lastName;
  clone.querySelector("[data-expelled=house]").textContent = exStudents.house;

  document.querySelector("#expelled tbody").appendChild(clone);
}
