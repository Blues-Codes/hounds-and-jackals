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
const goldCoinHead = "src/coin-head.png";
const goldCoinTail = "src/coin-tail.png";
const log1 = document.querySelector(`.log1`);
const log2 = document.querySelector(".log2");
const gameScreen = document.querySelector("#gamecontainer");
console.log(gameScreen);

// hiding borders for the containers

coinContainer.classList.add("hidden");
log1.classList.add("hidden");
log2.classList.add("hidden");

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

gameboard.src = "src/HJGameBoard.png";

const houndsGP = new Image(); // Hounds game piece
houndsGP.src = "src/Houndgamepiece.png";

const jackalsGP = new Image(); //Jackals game pieces
jackalsGP.src = "src/jackalgamepiece.png";

const logo = new Image(); // logo
logo.src = "src/HJLogo.png";

// objects for each player
class Player {
  constructor(name, x, y, image) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = 95;
    this.height = 95;
    this.image = image;
    this.currentPosition = 0;
  }
}

const hounds = new Player("hounds", 0, 0, houndsImg);
const jackals = new Player("jackals", 0, 0, jackalsImg);

for (let i = 0; i < 5; i++) {
  jackals.push({
    id: i + 1,
    name: "jackals",
    currentPosition: -1, // -1 means the game piece is not in play yet
    x: 20 + (i * 30),    // x-coordinate on the game board
    y: 370,              // y-coordinate on the game board
    width: 20,           // width of the game piece
    height: 20,          // height of the game piece
    isFinished: false    // whether the game piece has reached space 29
  });
  
  hounds.push({
    id: i + 1,
    name: "hounds",
    currentPosition: -1, // -1 means the game piece is not in play yet
    x: 20 + (i * 30),    // x-coordinate on the game board
    y: 20,               // y-coordinate on the game board
    width: 20,           // width of the game piece
    height: 20,          // height of the game piece
    isFinished: false    // whether the game piece has reached space 29
  });
}

function flipCoin() {
  const rng = Math.floor(Math.random() * 2);
  playing = rng === 0 ? jackals : hounds;
  const message = rng === 0
    ? "<h3>Heads! ANUBIS be praised! Jackals goes first!</h3>"
    : "<h3>Tails! May RA bless you! Hounds goes first!</h3>";
  log1.innerHTML = message;
  button.disabled = true;
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

  // if (playing.currentPosition > 29) {
  //   gameOver();
  // }
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
    coinMove1.src =
      "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
    coinMove2.src =
      "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
    coinMove3.src =
      "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
  }, 2000);
  if (playing.name === "hounds" && playing.currentPosition < 29) {
    let newHPos = playing.currentPosition + currentMove;
    console.log(hounds);
    // ctx.clearRect(playing.x, playing.y, playing.width, playing.height);
    console.log(newHPos, "hPos");
  
    playing.currentPosition += currentMove;
    console.log(playing.currentPosition);
    hounds.x = blackCords[newHPos].x;
    hounds.y = blackCords[newHPos].y;
    hounds.currentPosition = newHPos;
  
    console.log(hounds.x);
    console.log(playing.currentPosition);
  
    console.log(hounds);
  
    if (playing.currentPosition === 29) {
      console.log("Hounds win!");
      // add code to handle the end of the game
    }
  }
 
    if (playing.currentPosition === 6 && playing.name === "hounds") {
      ctx.clearRect(playing.x, playing.y, playing.width, playing.height);
      playing.currentPosition = 20;
      playing.x = whiteCords[20].x;
      playing.y = whiteCords[20].y;

    } else if (playing.currentPosition === 20 && playing.name === "hounds") {
      ctx.clearRect(playing.x, playing.y, playing.width, playing.height);
      playing.currentPosition = 6;
      playing.x = whiteCords[6].x;
      playing.y = whiteCords[6].y;

    } else if (playing.currentPosition === 6 && playing.name === "jackals") {
      ctx.clearRect(playing.x, playing.y, playing.width, playing.height);
      playing.currentPosition = 14;
      playing.x = blackCords[14].x;
      playing.y = blackCords[14].y;
    } else if (playing.currentPosition === 20 && playing.name === "jackals") {
      ctx.clearRect(playing.x, playing.y, playing.width, playing.height);
      playing.currentPosition = 6;
      playing.x = blackCords[6].x;
      playing.y = blackCords[6].y;
    }

    }
   
    if (playing.currentPosition === 8 && playing.name === "hounds") {
      ctx.clearRect(playing.x, playing.y, playing.width, playing.height);
      playing.currentPosition = 10;
      playing.x = whiteCords[10].x;
      playing.y = whiteCords[10].y;

    } else if (playing.currentPosition === 10 && playing.name === "hounds") {
      ctx.clearRect(playing.x, playing.y, playing.width, playing.height);
      playing.currentPosition = 8;
      playing.x = whiteCords[8].x;
      playing.y = whiteCords[8].y;

    } else if (playing.currentPosition === 8 && playing.name === "jackals") {
      ctx.clearRect(playing.x, playing.y, playing.width, playing.height);
      playing.currentPosition = 10;
      playing.x = blackCords[10].x;
      playing.y = blackCords[10].y;
    } else if (playing.currentPosition === 10 && playing.name === "jackals") {
      ctx.clearRect(playing.x, playing.y, playing.width, playing.height);
      playing.currentPosition = 8;
      playing.x = blackCords[8].x;
      playing.y = blackCords[8].y;
    }
    ctx.drawImage(
      playing.image,
      whiteCords[newHPos].x,
      whiteCords[newHPos].y,
      95,
      95
    );
    console.log(playing.currentPosition);
    playing = jackals;

    
        if (playing.name === "jackals" && playing.currentPosition < 29) {
          let newJPos = playing.currentPosition + currentMove;
          console.log(jackals);
          // ctx.clearRect(playing.x, playing.y, playing.width, playing.height);
          console.log(newJPos, "jpos");
        
          playing.currentPosition += currentMove;
          console.log(playing.currentPosition);
          jackals.x = blackCords[newJPos].x;
          jackals.y = blackCords[newJPos].y;
          jackals.currentPosition = newJPos;
        
          console.log(jackals.x);
          console.log(playing.currentPosition);
        
          console.log(jackals);
        
          if (playing.currentPosition === 29) {
            console.log("Jackals win!");
            // add code to handle the end of the game
          }
        }
    // return;

    if (playing.currentPosition === 6 && playing.name === "jackals") {
      // update();
      console.log("6 to 20");
      ctx.clearRect(playing.x, playing.y, playing.width, playing.height);
      playing.currentPosition = 20;
      playing.x = blackCords[20].x;
      playing.y = blackCords[20].y;
      console.log(playing);
      console.log(jackals);
      // ctx.drawImage(
      //   playing.image,
      //   playing.x,
      //   playing.y,
      //   playing.width,
      //   playing.height
      // );
    }
    if (playing.currentPosition === 20 && playing.name === "jackals") {
      // update();
      ctx.clearRect(playing.x, playing.y, playing.width, playing.height);
      playing.currentPosition = 6;
      playing.x = blackCords[6].x;
      playing.y = blackCords[6].y;
      console.log(newJPos);
      console.log(playing);
      console.log(hounds);

    }
    if (playing.currentPosition === 8 && playing.name === "jackals") {
      // update();
      ctx.clearRect(playing.x, playing.y, playing.width, playing.height);
      playing.currentPosition = 10;
      playing.x = blackCords[10].x;
      playing.y = blackCords[10].y;
      console.log(newJPos);
      console.log(playing);
      console.log(hounds);

    }

    if (playing.currentPosition === 10 && playing.name === "jackals") {
      // update();
      ctx.clearRect(playing.x, playing.y, playing.width, playing.height);
      playing.currentPosition = 8;
      playing.x = blackCords[8].x;
      playing.y = blackCords[8].y;
      console.log(newJPos);
      console.log(playing);
      console.log(hounds);

    }
    ctx.drawImage(
      playing.image,
      blackCords[newJPos].x,
      blackCords[newJPos].y,
      playing.width,
      playing.height
    );
    playing = hounds;
    return;
  

function startGame() {
  document.getElementById("startplaywin").style.display = "flex";
  console.log("Starting");
  document.getElementById("startplaywin").style.visibility = "visible";
  logo.style.visibility = "hidden";
  logo.style.height = "0px";
  canvas.width = "800";
  canvas.height = "750";
  canvas.style.visibility = "visible";
  canvas.style.display = "inherit";
}

function gameOver() {
  console.log("game over 2");
  // cancelAnimationFrame(animate);
  // gameScreen.style.display = "none";
  //   console.log("Game over")
  ctx.clearRect(0, 0, 800, 800);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 800, 800);

  if (playing.name === "jackals" && playing.currentPosition > 28) {
    ctx.fillStyle = "white";
    ctx.font = "40px serif";
    ctx.fillText("Jackals have won!", 150, 200);
  } else if (playing.name === "hounds" && playing.currentPosition > 28) {
    ctx.fillStyle = "white";
    ctx.font = "40px serif";
    ctx.fillText("Hounds have won!", 150, 200);
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
  let game = requestAnimationFrame(animate);
  if (jackals.currentPosition > 28 || hounds.currentPosition > 28) {
    console.log("game over")
    cancelAnimationFrame(game)
    gameOver();
  }
  
  // console.log(requestAnimationFrame(animate))
}
function flipCoin() {
  const coins = document.querySelectorAll(".coin");
  coins.forEach((coin) => {
    coin.classList.add("flip");
  });
  setTimeout(() => {
    coins.forEach((coin) => {
      coin.classList.remove("flip");
    });
  }, 1500);

button.addEventListener(`click`, () => {
  flipCoin();
  flipMoves();
  coinContainer.classList.toggle("hidden");
  log1.classList.toggle("hidden");
  log2.classList.toggle("hidden");
})
}
