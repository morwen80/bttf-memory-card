resetButton = document.querySelectorAll('.reset')
resetButton.forEach(button => button.addEventListener('click', playAgain));
replayBtn = document.querySelector('.fa-sync-alt')
replayBtn.addEventListener('click', spinningIcon)

// timerBtn = document.querySelector('#startTimer');
// timerBtn.addEventListener('click', startTimer)

// LEVELS
let wrapper = document.querySelector('wrapper')
let easy = document.querySelector('#lev1')
let medium = document.querySelector('#lev2')
let hard = document.querySelector('#lev3')


// select Easy Level
easy.addEventListener('click', () => {


  let easyCards = document.querySelectorAll('.easy');
    easyCards.forEach(card => card.classList.remove('hiddenLevel'))
    easyCards.forEach(card => card.classList.add('visibleLevel'))
    wrapper.style.width = "30%"
})

// select Medium Level
medium.addEventListener('click', () => {
  let mediumCards = document.querySelectorAll('.medium');
    mediumCards.forEach(card => card.classList.remove('hiddenLevel'))
    mediumCards.forEach(card => card.classList.add('visibleLevel'))
    wrapper.style.width = "55%"
})

// select Hard Level
hard.addEventListener('click', () => {
  let hardCards = document.querySelectorAll('.hard');
    hardCards.forEach(card => card.classList.remove('hiddenLevel'))
    hardCards.forEach(card => card.classList.add('visibleLevel'))
    wrapper.style.width = "65%"
})

const resetLevel = (e) => {
  alert("it works")
  e.target.classList.remove('visibleLevel')
  e.target.classList.remove('hiddenLevel')
}

// END LEVEL SECTION

const modal = document.querySelector('#congratsWindow');
const closeWon = document.querySelector('.close')
closeWon.addEventListener('click', closeModal);

const wonPopup = document.querySelector('.won');
const finalTime = document.querySelector('#finalTime');

const memoryCards = document.querySelectorAll('.card');

let isModalOpen = false;
let isGameStarted = false;
let isTimerRunning = false;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// ADD LINK TO GIFs OF BTTF THAT CAN APPEAR INSIDE THE MODAL AT RANDOM, OR BY CALLING AN EXTERNAL API
const gifArray = [];

function flipCard(){
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  }
  else {
    hasFlippedCard = false;
    secondCard = this

//     do cards match?
   checkForMatch();
   openModal();
  }
  isGameStarted = true;
  isTimerRunning = true;
};

function checkForMatch(){
  let isAMatch = firstCard.dataset.char === secondCard.dataset.char
   isAMatch ? disableCards() : unflipCards();
}

function disableCards(){
  isGameStarted = true;
  firstCard.removeEventListener('click',flipCard);
  secondCard.removeEventListener('click',flipCard);

  resetBoard();
}

function unflipCards(){
  lockBoard = true;
  isGameStarted = true;
  setTimeout( () => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000)
}

function resetBoard(){
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
  isGameStarted = true;
  isTimerRunning = true;
}

function playAgain(){
  location.reload();
}

// function playAgain(){
//   shuffle();
//   isTimerRunning = false;
//   isGameStarted = true;
//   stopTimer();
//   resetTimer();
//
//   memoryCards.forEach( card => card.classList.remove('flip'));
//   memoryCards.forEach( card => card.addEventListener('click', flipCard));
// }


function spinningIcon(){
  replayBtn.classList.add('rotate')
}

function shuffle(){
  isTimerRunning = false;

  memoryCards.forEach( card => {
    let randomCard = Math.floor(Math.random() * 12);
    card.style.order = randomCard;
  });
}

// MODAL
function openModal(){
  isGameStarted = false;
  isModalOpen = true;
  if (document.querySelectorAll('.flip').length == 8) {
  timerResult();
  setTimeout(() => {
    modal.style.visibility = "visible"
  }, 1500)};
};

function closeModal(){
  if (isModalOpen) {
    modal.style.visibility = "hidden";

    resetTimer();
    playAgain();
  }
  isModalOpen = false;
};


// TIMER
let second = 0;
let minute = 0;

let howLong;

function startTimer(){
  isTimerRunning = true;

  if (isGameStarted == true ){

    timerBtn.innerHTML = `${minute}: ${second}
    <i class="fas fa-hourglass-start rotate"></i>
    `
    second++;
      if(second == 60){
        minute++;
        second = 0;
      }
    }
}

howLong = setInterval(startTimer, 1000);

function stopTimer(){
  isTimerRunning = false;
  isGameStarted = false;
  clearInterval(howLong)
}



// function startTimer(){
//   isTimerRunning = true;
//     howLong = setInterval(function(){
//         timerBtn.innerHTML = `${minute}: ${second}
//         <i class="fas fa-hourglass-start rotate"></i>
//         `
//         second++;
//         if(second == 60){
//             minute++;
//             second = 0;
//         }
//         // if(minute == 60){
//         //     hour++;
//         //     minute = 0;
//         // }
//     },1000);
// }

function timerResult(){
  let result = `${minute} : ${second}`;
      finalTime.innerHTML = result;
}

function resetTimer(){
  isGameStarted = false;
  isTimerRunning = false;
  // second = 0;
  // minute = 0;
  timerBtn.innerHTML = `
    timer <i class="fas fa-hourglass-start"></i>
  `
};



memoryCards.forEach( card => card.addEventListener('click', flipCard));
shuffle();
