// !!Create squares array dynamically in JS=====================================================
function createSquares() {
  // loop 196 to create all the divs needed for the grid
  for (let index = 1; index <= 196; index++) {
    let newDiv = document.createElement("div");
    document.querySelector(".grid").appendChild(newDiv);
  }
}
createSquares();

// 1: Variables needed========================================================================
const squares = document.querySelectorAll(".grid div");
const scoreDisplay = document.querySelector("span");
const startBtn = document.querySelector(".start");

const width = 14; // There are 14 columns in our grid (20px * 14)
let currentIndex = 0; // This is the first div in our grid
let appleIndex = 0; // This is the first div in our grid
let currentSnake = [2, 1, 0]; // Index: 0=tail 1=body 2=Head

let direction = 1; // Number of squares the snake will move
let score = 0;
let speed = 0.85;
let intervalTime = 0;
let interval = 0;

// Change colour of body
document.body.style.backgroundColor = "#96d202";

// Change colour of grid
const grid = document.querySelector(".grid");
grid.style.backgroundColor = "#96d202";

// 3: Start and restart==========================================================================
function startGame() {
  currentSnake.forEach((index) => squares[index].classList.remove("snake"));
  squares[appleIndex].classList.remove("apple");
  clearInterval(interval);
  score = 0;
  randomApple();
  direction = 1; // start direction = right
  if (score > 0) {
    scoreDisplay.style.color = "green";
  } else {
    scoreDisplay.style.color = "black";
  }
  scoreDisplay.innerText = "My score: " + score;
  intervalTime = 500;
  currentSnake = [2, 1, 0];
  currentIndex = 0;

  currentSnake.forEach((index) => squares[index].classList.add("snake"));
  interval = setInterval(moveOutcomes, intervalTime);
}

// 4: Move outcomes==============================================================================
function moveOutcomes() {
  if (
    (currentSnake[0] % width === width - 1 && direction === 1) || // snake head hits right
    (currentSnake[0] - width < 0 && direction === -width) || // snake head hits top
    (currentSnake[0] % width === 0 && direction === -1) || // snake head hits left
    (currentSnake[0] + width >= width * width && direction === width) || // snake head hits bottom
    squares[currentSnake[0] + direction].classList.contains("snake") // snake hits self
  ) {
    scoreDisplay.style.color = "red";
    scoreDisplay.innerText = "Game Over! " + score;
    return clearInterval(interval); // ends game if any of the above happen
  }

  // remove the tail
  // The pop() method removes the last element from an array
  const tail = currentSnake.pop();
  squares[tail].classList.remove("snake");

  // The unshift() method adds one or more elements to the BEGINNING of an array
  // give direction to the array
  currentSnake.unshift(currentSnake[0] + direction);

  // eats an apple
  if (squares[currentSnake[0]].classList.contains("apple")) {
    squares[currentSnake[0]].classList.remove("apple");
    squares[tail].classList.add("snake");
    // The push() method adds one or more elements to the END of an array
    currentSnake.push(tail);

    randomApple();

    score++;
    if (score > 0) {
      scoreDisplay.style.color = "green";
    } else {
      scoreDisplay.style.color = "black";
    }
    scoreDisplay.textContent = "My score: " + score;

    clearInterval(interval);
    intervalTime = intervalTime * speed;
    interval = setInterval(moveOutcomes, intervalTime);
  }
  squares[currentSnake[0]].classList.add("snake");
}

// 5: Generate a new apple=======================================================================
function randomApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
}

// 2: Setting direction of the snake=============================================================
function control(event) {
  squares[currentIndex].classList.remove("snake");

  // Stop snakey from ending the game if he reverses on himself
  if (event.key === "ArrowRight") {
    direction = 1; // snake moves 1 div to the right
  } else if (event.key === "ArrowUp") {
    direction = -width; // snake goes back 10 divs (appearing to move upwards)
  } else if (event.key === "ArrowLeft") {
    direction = -1; // snake moves 1 div to the left
  } else if (event.key === "ArrowDown") {
    direction = +width; // snake goes forward 10 divs (appearing to move downwards)
  }
}

// 6: Event listeners============================================================================

document.addEventListener("keyup", control);
startBtn.addEventListener("click", startGame);
