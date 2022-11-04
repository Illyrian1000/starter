"use strict";

// let turn = 0;
// const player1Board = document.getElementById("score--0");
// const player2Board = document.getElementById("score--1");

// const rollDiceBtn = document.querySelector(".btn--roll");
// const holdBtn = document.querySelector(".btn--hold");
// const diceImg = document.querySelector(".dice");

// const currentScore1 = document.getElementById("current--0");
// const currentScore2 = document.getElementById("current--1");

// const card1 = document.querySelector(".player--0");
// const card2 = document.querySelector(".player--1");

// player1Board.innerHTML = 0;
// player2Board.innerHTML = 0;

// let score = 0;

// let rollDice = function () {
//   return Math.floor(Math.random() * 6 + 1);
// };

// rollDiceBtn.addEventListener("click", function () {
//   let dice = rollDice();
//   changeImg(dice);
//   let points = addScores(dice);
//   if (dice > 1) {
//     currentScore1.innerHTML = points;
//   } else {
//     score = 0;
//     currentScore1.innerHTML = 0;
//     return score;
//   }
// });

// function changeImg(number) {
//   diceImg.src = `dice-${number}.png`;
// }

// function addScores(number) {
//   return (score += number);
// }

// holdBtn.addEventListener("click", function () {
//   let holdPoints = Number(player1Board.innerHTML) + score;
//   player1Board.innerHTML = holdPoints;
//   scoreToZero();
//   currentScore1.innerHTML = score;

//   card1.classList.remove("player--active");
//   card2.classList.add("player--active");
// });

// function scoreToZero() {
//   return (score = 0);
// }

// if press ROLL DICE
//     > generate DICE
//     > change DICE IMG
//     > change current to SCORE + DICE

//         if DICE = 1
//             > SCORE = 0;
//             > change current SCORE
//             > other Player

// if press HOLD
//     > PlayerScore = SCORE;
//     > SCORE = 0;
//     > other Player

let turn = 1;
let score = 0;

const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");

const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");

const card1 = document.querySelector(".player--0");
const card2 = document.querySelector(".player--1");

const holdBtn = document.querySelector(".btn--hold");
const rollBtn = document.querySelector(".btn--roll");
const newBtn = document.querySelector(".btn--new");

score0.innerHTML = 0;
score1.innerHTML = 0;

rollBtn.addEventListener("click", function () {
  let dice = newDice();
  document.querySelector(".dice").src = `dice-${dice}.png`;
  if (turn % 2 != 0) {
    if (dice === 1) {
      current0.innerHTML = 0;
      turnChange();
    } else {
      current0.innerHTML = getScore(dice, current0);
    }
  } else {
    if (dice === 1) {
      current1.innerHTML = 0;
      turnChange();
    } else {
      current1.innerHTML = getScore(dice, current1);
    }
  }
  changeActive();
});

holdBtn.addEventListener("click", function () {
  if (turn % 2 != 0) {
    score0.innerHTML = Number(score0.innerHTML) + Number(current0.innerHTML);
    current0.innerHTML = 0;
    checkWinner(score0, card1);
    turnChange();
  } else {
    score1.innerHTML = Number(score1.innerHTML) + Number(current1.innerHTML);
    current1.innerHTML = 0;
    checkWinner(score1, card2);
    turnChange();
  }
  changeActive();
});

function getScore(number, source) {
  score = Number(source.innerHTML);
  return score + number;
}

function newDice() {
  return Math.floor(Math.random() * 6 + 1);
}

function turnChange() {
  return turn++;
}

function changeActive() {
  if (turn % 2 != 0) {
    card1.classList.add("player--active");
    card2.classList.remove("player--active");
  } else {
    card2.classList.add("player--active");
    card1.classList.remove("player--active");
  }
}

function checkWinner(points, card) {
  if (Number(points.innerHTML) >= 100) {
    card.classList.add("player--winner");
    rollBtn.style.display = "none";
    holdBtn.style.display = "none";
  }
}

newBtn.addEventListener("click", function () {
  turn = 1;
  score = 0;

  current0.innerHTML = 0;
  current1.innerHTML = 0;

  score0.innerHTML = 0;
  score1.innerHTML = 0;

  card1.classList.remove("player--winner");
  card2.classList.remove("player--winner");

  card1.classList.remove("player--active");
  card2.classList.remove("player--active");

  holdBtn.style.display = "flex";
  rollBtn.style.display = "flex";
});
