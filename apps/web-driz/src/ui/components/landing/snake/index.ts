import { SnakeGame } from "@components/landing/snake/SnakeGame";

const snakeGame = new SnakeGame();

const changeDifficulty = () => {
  switch (snakeGame.difficulty) {
    case 1:
      document.getElementById("game-difficulty")!.innerText = `Normal`;
      snakeGame.difficulty = 2;
      break;
    case 2:
      document.getElementById("game-difficulty")!.innerText = `Hard`;
      snakeGame.difficulty = 3;
      break;
    case 3:
      document.getElementById("game-difficulty")!.innerText = `Easy`;
      snakeGame.difficulty = 1;
      break;
  }
};

export const preventControlButtons = (e: KeyboardEvent) => {
  if (
    ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
      e.code,
    ) > -1
  ) {
    e.preventDefault();
  }
};

const startGame = () => {
  document.querySelector(".game-start-screen")!.classList.add("hidden");
  document.getElementById("right-image")!.classList.add("right-image-moved");
  document.getElementById("score")!.classList.remove("hidden");
  document.querySelector(".board")!.classList.add("board-moved");

  window.addEventListener("keydown", preventControlButtons, false);
  snakeGame.startGame();
};

window.addEventListener(
  "keydown",
  (e) => {
    if (e.code === "Escape") {
      const rightImage = document.getElementById("right-image");
      const board = document.querySelector(".board");
      const score = document.querySelector("#score");
      const countdown = document.querySelector(".countdown");

      if (board && rightImage && score && countdown) {
        e.preventDefault();
        snakeGame.gameOver = true;
        snakeGame.resetGame();
        window.removeEventListener("keydown", preventControlButtons, false);

        board.classList.remove("board-moved");
        rightImage.classList.remove("right-image-moved");
        score.classList.add("hidden");
        countdown.classList.add("hidden");
      }
    }
  },
  false,
);

document.addEventListener("astro:before-swap", () => {
  snakeGame.gameOver = true;
  snakeGame.resetGame();
  window.removeEventListener("keydown", preventControlButtons, false);
});

document.addEventListener("astro:page-load", () => {
  document.querySelector("main")!.addEventListener(
    "scroll",
    () => {
      const rightImage = document.getElementById("right-image");
      const board = document.querySelector(".board");
      const score = document.querySelector("#score");
      const countdown = document.querySelector(".countdown");

      board?.classList.remove("board-moved");
      rightImage?.classList.remove("right-image-moved");
      score?.classList.add("hidden");
      countdown?.classList.add("hidden");
    },
    false,
  );

  document.getElementById("start-game")?.addEventListener("click", startGame);

  document
    .getElementById("change-difficulty")
    ?.addEventListener("click", changeDifficulty);
});
