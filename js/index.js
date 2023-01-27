const canvas = document.getElementById("gameboard");
const ctx = canvas.getContext("2d");

//capturing HTML elements
const flipCoinMove = document.querySelector("#flip-moves");
const coin = document.querySelector(`#coin`);
const button = document.querySelector(`#flip-button`);
const result = document.querySelector(`#result `);
const coinImage = document.querySelector(".coinImg");
const coinMove1 = document.querySelector(".coinMove1");
const coinMove2 = document.querySelector(".coinMove2");
const coinMove3 = document.querySelector(".coinMove3");
const goldCoinHead = "../images/coin-head.png";
const goldCoinTail = "../images/coin-tail.png";
const log1 = document.querySelector(`.log1`);
const log2 = document.querySelector('.log2');
const gameScreen = document.querySelector('#gamecontainer');
console.log(gameScreen)


// how many moves in the current round
let currentMove;


//array of moves depending on coin flips
const moves = [
  {
    name: "3 heads",
    moves: 3,
  },
  {
    name: "2 heads",
    moves: 2,
  },
  {
    name: "1 head",
    moves: 1,
  },
  {
    name: "3 tails",
    moves: 5,
  },
];

//array to store the result of coin flip for moving
let coinMoves = [];
let round = 0;

//current player playing
let playing;

const gameboard = new Image(); // gameboard

gameboard.src = "../src/HJGameBoard.png";

const houndsGP = new Image(); // Hounds game piece
houndsGP.src = "../src/Houndgamepiece.png";

const jackalsGP = new Image(); //Jackals game pieces
jackalsGP.src = "../src/jackalgamepiece.png";

const logo = new Image(); // logo
logo.src= "../src/HJLogo.png";


// objects for each player
const jackals = {
  name: "jackals",
  x: 0,
  y: 0,
  width: 95,
  height: 95,
  image: jackalsGP,
  currentPosition: 0,
};

const hounds = {
  name: "hounds",
  x: 0,
  y: 0,
  width: 95,
  height: 95,
  image: houndsGP,
  currentPosition: 0,
};

function flipCoin() {
  const rng = Math.floor(Math.random() * 2);
  if (rng === 0) {
    coinImage.src = "../Images/coin-head-silver.png";
    playing = jackals;
    log1.innerHTML = `<h3>Heads! ANUBIS be praised! Jackals goes first!</h3>`;
  } else {
    coinImage.src = "../Images/coin-tail-silver.png";
    playing = hounds;
    log1.innerHTML = `<h3>Tails! May RA bless you! Hounds goes first!</h3>`;
  }
  button.disabled = true;
  console.log(playing.name);
}

//coin flip to decide how many moves, "dice" of this game
function flipMoves() {
  const rng = Math.floor(Math.random() * 2);
  console.log(rng);
  if (rng === 0 && round === 0) {
    round += 1;
    coinMoves.push("heads");
    coinMove1.src = goldCoinHead;
    return;
  }
  if (rng === 0 && round === 1) {
    round += 1;
    coinMoves.push("heads");
    coinMove2.src = goldCoinHead;
    return;
  }
  if (rng === 0 && round === 2) {
    round += 1;
    coinMoves.push("heads");
    coinMove3.src = goldCoinHead;
    checkForMoves();
    coinMoves = [];
    console.log(coinMoves);
    return;
  }
  if (rng === 1 && round === 0) {
    round += 1;
    coinMoves.push("tails");
    coinMove1.src = goldCoinTail;
    return;
  }
  if (rng === 1 && round === 1) {
    round += 1;
    coinMoves.push("tails");
    coinMove2.src = goldCoinTail;
    return;
  }
  if (rng === 1 && round === 2) {
    round += 1;
    coinMoves.push("tails");
    coinMove3.src = goldCoinTail;
    checkForMoves();
    coinMoves = [];
    return;
  }
}
function checkForMoves() {
  round = 0;
  const heads = coinMoves.filter((current) => current === "heads");
  const tails = coinMoves.filter((current) => current === "tails");
  
  if(playing.currentPosition > 29){
    gameOver()
  }
  if (heads.length === 3) {
    currentMove = moves[0].moves;
    log2.innerHTML = `<h3>3 Heads! ${playing.name} got ${currentMove} moves.</h3>`;
  }
  if (heads.length === 2) {
    currentMove = moves[1].moves;
    log2.innerHTML = `<h3>2 Heads! ${playing.name} got ${currentMove} moves.</h3>`;
  }
  if (heads.length === 1) {
    currentMove = moves[2].moves;
    log2.innerHTML = `<h3> Heads! ${playing.name} got ${currentMove} moves.</h3>`;
  }
  if (tails.length === 3) {
    currentMove = moves[3].moves;
    log2.innerHTML = `<h3>WOW, 3 Tails! ${playing.name} got ${currentMove} moves.</h3>`;

  }
  console.log("💃", currentMove);
  console.log("💻", playing);
  // ctx.clearRect(0, 0, canvas.width, canvas.height);


   flipCoinMove.disabled = true;
  setTimeout(() => {
    flipCoinMove.disabled = false;
    coinMove1.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
    coinMove2.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
    coinMove3.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
  }, 2000);
  if (playing.name === "hounds" && playing.currentPosition < 29) {
    let newHPos = playing.currentPosition + currentMove;
    console.log("testing")
    ctx.clearRect(playing.x, playing.y, playing.width, playing.height);

    ctx.drawImage(
      playing.image,
      whiteCords[newHPos].x,
      whiteCords[newHPos].y,
      95,
      95
    );
    playing.currentPosition += currentMove;

    if (playing.currentPosition === 6 && playing.name === "hounds") {
      // update();
      ctx.drawImage(
        playing.image,
        whiteCords[20].x,
        whiteCords[20].y,
        playing.width,
        playing.height
      );
    }
    if (playing.currentPosition === 20 && playing.name === "hounds") {
      // update();
      ctx.drawImage(
        playing.image,
        whiteCords[6].x,
        whiteCords[6].y,
        playing.width,
        playing.height
      );
    }
    if (playing.currentPosition === 8 && playing.name === "hounds") {
      // update();
      ctx.drawImage(
        playing.image,
        whiteCords[10].x,
        whiteCords[10].y,
        playing.width,
        playing.height
      );
    }

    if (playing.currentPosition === 10 && playing.name === "hounds") {
      // update();
      ctx.drawImage(
        playing.image,
        whiteCords[8].x,
        whiteCords[8].y,
        playing.width,
        playing.height
      );
    }
    console.log(playing.currentPosition);

    hounds.y = whiteCords[newHPos].y;
    hounds.x = whiteCords[newHPos].x;
    playing = jackals;
    console.log(playing);
    return;
  }
  if (playing.name === "jackals" && playing.currentPosition < 29) {
    let newJPos = (playing.currentPosition + currentMove);
    ctx.clearRect(playing.x, playing.y, playing.width, playing.height);
    ctx.drawImage(
      playing.image,
      blackCords[newJPos].x,
      blackCords[newJPos].y,
      playing.width,
      playing.height
    );
  playing.currentPosition += currentMove;
  if (playing.currentPosition === 6 && playing.name === "jackals") {
    // update();
    ctx.drawImage(
      playing.image,
      blackCords[20].x,
      blackCords[20].y,
      playing.width,
      playing.height
    );
  }
  if (playing.currentPosition === 20 && playing.name === "jackals") {
    // update();
    ctx.drawImage(
      playing.image,
      blackCords[6].x,
      blackCords[6].y,
      playing.width,
      playing.height
    );
  }
  if (playing.currentPosition === 8 && playing.name === "jackals") {
    // update();
    ctx.drawImage(
      playing.image,
      blackCords[10].x,
      blackCords[10].y,
      playing.width,
      playing.height
    );
  }

  if (playing.currentPosition === 10 && playing.name === "jackals") {
    // update();
    ctx.drawImage(
      playing.image,
      blackCords[8].x,
      blackCords[8].y,
      playing.width,
      playing.height
    );
  }
    console.log(playing.currentPosition);
    jackals.x = blackCords[newJPos].x;
    jackals.y = blackCords[newJPos].y;
    console.log(playing.currentPosition);
    playing = hounds;
    console.log(playing);
      return;
    }
}
function startGame() {
  document.getElementById("startplaywin").style.display = "flex";
  console.log("Starting");
  document.getElementById("startplaywin").style.visibility = "visible";
  logo.style.visibility = "hidden"
  logo.style.height = "0px"
  canvas.width = "800";
  canvas.height = "750";
  canvas.style.visibility = "visible";
  canvas.style.display = "inherit";
}

function gameOver() {
gameScreen.style.display = "none";
  console.log("Game over")
  ctx.clearRect(0,0,500,700)
  ctx.fillStyle = 'black'
  ctx.fillRect(0,0,500,700)

  if (playing.name === "Jackals" && playing.currentPosition >= 29) {
    ctx.fillStyle = "white"
    ctx.font = '40px serif'
    ctx.fillText("Jackals have won!", 150, 200)
  } else if (playing.name === "Hounds" && playing.currentPosition >= 29) {
    ctx.fillStyle = "white"
    ctx.font = '40px serif'
    ctx.fillText("Hounds have won!", 150, 200)
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(gameboard, 0, 0, 800, 800);
  ctx.drawImage(
    jackals.image,
    jackals.x,
    jackals.y,
    jackals.width,
    jackals.height
  );
  ctx.drawImage(hounds.image, hounds.x, hounds.y, hounds.width, hounds.height);

  requestAnimationFrame(animate);
}
window.onload = function () {
  animate();
  document.getElementById("game-instructions").onclick = function () {
    console.log("hitting button");
    ctx.drawImage(gameboard, 0, 0, 800, 800);
    startGame();
  };
};
button.addEventListener(`click`, () => {
  flipCoin();
  // document.getElementById(".log2").style.visibility = "hidden";
  flipCoinMove.addEventListener("click", () => {
    flipMoves();
    // document.getElementById("startplaywin").style.display = "flex";
  console.log("Starting");
 });
});