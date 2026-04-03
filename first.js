let boxes = document.querySelectorAll(".box");
let resetBtn = document.getElementById("reset-btn");

let turnO = true;

const winPatterns = [
  [0,1,2], 
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

// click event
boxes.forEach((box) => {
  box.addEventListener("click", () => {

    // prevent overwrite
    if (box.innerText !== "") return;

    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }

    checkWinner();
  });
});

// winner check function
function checkWinner() {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      alert(`Winner is ${pos1}`);
      disableBoxes();
    }
  }
}

// disable after win
function disableBoxes() {
  boxes.forEach((box) => box.disabled = true);
}

// reset game
resetBtn.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  turnO = true;
});

