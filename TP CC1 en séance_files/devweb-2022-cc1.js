"use strict";


const $startBtn = document.getElementById("start-btn");
const $guessBtn = document.getElementById("guess-btn");
const $cowBtn = document.getElementById("cow-btn");
const $output = document.getElementById("output");
const $numUsr = document.getElementById("num-usr");
const $maxUsr = document.getElementById("max-usr");

let secretNumber = 0;
let nbGuesses = 0;
let maxGuesses = 0;

let gameLaunched = false;

function launchGame(_evt) {
  // We wait for the first game to finish before launching another one
  if (gameLaunched) {
    return;
  }
  gameLaunched = true;

  secretNumber = Math.floor(Math.random() * $maxUsr.value) + 1;
  maxGuesses = Math.ceil(Math.log($maxUsr.value)) + 1;
  
  const NB_MAX = $maxUsr.value;
  nbGuesses = Math.floor(Math.random() * NB_MAX) + 1;

  $output.innerText += `Partie lancée, trouvez le nombre secret en au plus ${nbGuesses} coups.\n`;

  $guessBtn.disabled = false;

  let counter = 0;
  $guessBtn.addEventListener("click", function checkValue(_evt) {

    const INPUT_GUESS_NUMBER = $numUsr.value;

    // We check if the user didnt input anything or if he inputed a decimal number
    if (INPUT_GUESS_NUMBER == "" || INPUT_GUESS_NUMBER % 1 != 0) {
      $output.innerText += "Il faut saisir un nombre entier !\n";
      return;
    };
    
    counter++;

    if (counter == nbGuesses) {
      $output.innerText += `Perdu... le nombre était ${secretNumber}.\n`;
      $guessBtn.disabled = true;
      gameLaunched = false;
      $guessBtn.removeEventListener("click", checkValue);
    }
    else if (INPUT_GUESS_NUMBER < secretNumber) {
      $output.innerText += `${INPUT_GUESS_NUMBER} est trop bas.\n`;
    }
    else if (INPUT_GUESS_NUMBER > secretNumber) {
      $output.innerText += `${INPUT_GUESS_NUMBER} est trop haut.\n`;
    }
    else {
      $output.innerText += `Bravo, vous avez trouvé en ${counter} coups !\n`;
      $guessBtn.disabled = true;
      gameLaunched = false;
      $guessBtn.removeEventListener("click", checkValue);
    };
  });

}

$startBtn.addEventListener("click", launchGame);



function addCow(evt) {
  // .x and .y doesnt work when the page is scrollable, like in our case when cows are added to the end
  //console.debug(evt.x, evt.y);

  // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX
  console.debug(evt.pageX, evt.pageY);

  // We add a cow at the end of the page (inside a div so the images are below another)
  const $div = document.createElement("div");
  document.body.appendChild($div);
  const $imgPage = document.createElement("img");
  $imgPage.src = "https://upload.wikimedia.org/wikipedia/commons/3/30/Cowicon.svg";
  $div.appendChild($imgPage);


  // We add a cow below the user's cursor
  const $imgCursor = document.createElement("img");
  $imgCursor.classList.add("cow");
  $imgCursor.style.left = `${evt.pageX}px`;
  $imgCursor.style.top = `${evt.pageY}px`;
  $imgCursor.style.transform = `rotate(${Math.random()}turn)`;
  $imgCursor.src = "https://upload.wikimedia.org/wikipedia/commons/3/30/Cowicon.svg";
  document.body.appendChild($imgCursor);

}

function toggleCow(_evt) {
  if (document.onmousedown instanceof Function) {
    document.onmousedown = null;
  } else {
    document.onmousedown = addCow;
  }
}
$cowBtn.addEventListener("click", toggleCow);

