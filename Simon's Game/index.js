// Fall sem býr til random tölu á milli 1 og 4:
function randomNumber() {
  return Math.floor(Math.random() * 4) + 1;
}

// Fall sem skilar element-inu sem hefur sama id og random talan:
function randomBox() {
  return $("#" + randomNumber());
}

// Fall sem bætir klasanum "active-box" við element-ið
// og fjarlægir hann síðan eftir hálfa sek:
function executeSequence(elem, delay) {
  setTimeout(function() {
    elem.addClass("box-active")
  }, delay);
  setTimeout(function() {
    elem.removeClass("box-active")
  }, delay + 200);
}

function humanGuess(elem) {
  elem.addClass("box-active");
  setTimeout(function() {
    elem.removeClass("box-active")
  }, 200);
}

// Fall sem keyrir executeSequence() og bíður síðan í 1 sek:
function runComputer(elem, delay) {
  humansTurn = false;
  for (var i = 0; i < elem.length; i++) {
    setTimeout(executeSequence(elem[i], delay), delay);
    delay += 1000;
  }
  setTimeout(function() {
    changeStatus()
  }, (elem.length * 1000));
}


function changeStatus() {
  $(".status").text("Repeat the sequence.");
  humansTurn = true;
  inputCounter = 0;
}

function levelCountDown(countDown, levelDelay) {
  setTimeout(function() {
    $(".status").text("Well done! Get ready for next level in " + countDown);
  }, levelDelay);
}

function levelUp() {
  humansTurn = false;
  let levelDelay = 0;
  let countDown = 3;
  for (var i = 0; i < 3; i++) {
    setTimeout(levelCountDown(countDown, levelDelay), levelDelay);
    countDown--;
    levelDelay += 1000;
  }
  setTimeout(nextLevel, levelDelay);
}

function nextLevel() {
  level++;
  $(".title").text("Level " + level);
  $(".status").text("Pay attention...");
  sequence.push(randomBox());
  runComputer(sequence, delay);
  humansTurn = true;
}

function gameOver() {
  $(".title").text("Game over :( You reached level " + level);
  $(".status").text("Press any key to start again.");
  humansTurn = false;
  isGameOver = true;
}

function restart() {
  level = 0;
  sequence = [];
  isGameOver = false;
  computersTurn = true;
}

function runHuman(id) {
  if (humansTurn) {
    var seqID = parseInt(sequence[inputCounter].attr("id"));
    switch (id) {
      case 1:
        if (id == seqID) {
          humanGuess(sequence[inputCounter]);
          inputCounter++;
        } else {
          gameOver();
        }
        break;
      case 2:
        if (id == seqID) {
          humanGuess(sequence[inputCounter]);
          inputCounter++;
        } else {
          gameOver();
        }
        break;
      case 3:
        if (id == seqID) {
          humanGuess(sequence[inputCounter]);
          inputCounter++;
        } else {
          gameOver();
        }
        break;
      case 4:
        if (id == seqID) {
          humanGuess(sequence[inputCounter]);
          inputCounter++;
        } else {
          gameOver();
        }
        break;
    }

    if (inputCounter >= sequence.length) {
      console.log("Sequence completed...");
      levelUp();
    }
  }
}

// Upphafsstilli breytur og fylki:
let sequence = [];
let delay = 0;
let inputCounter = 0;
let level = 0;
let computersTurn = true;
let humansTurn = false;
let isGameOver = false;



// Keyri random röð með time-delay:
// run(sequence,delay);

$(document).on("keydown", function() {
  if (computersTurn) {
    computersTurn = false;
    nextLevel();
  };
});

$(document).on("click", function() {
  if (computersTurn) {
    computersTurn = false;
    nextLevel();
  };
});



$(document).on("keydown", function(event) {
  if (humansTurn) {
    runHuman(parseInt(event.key));
  }
});

$(".box").click(function() {
  if (humansTurn) {
    id = parseInt($(this).attr("id"));
    runHuman(id);
  }
});

$(document).on("keydown", function() {
  if (isGameOver) {
    restart();
  }
})
