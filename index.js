resetButton = document.querySelectorAll('.reset')
resetButton.forEach(button => button.addEventListener('click', playAgain));
replayBtn = document.querySelector('.fa-sync-alt')
replayBtn.addEventListener('click', spinningIcon)

timerBtn = document.querySelector('#startTimer');
timerBtn.addEventListener('click', startTimer)

const modal = document.querySelector('#congratsWindow');
const closeWon = document.querySelector('.close')
closeWon.addEventListener('click', closeModal);

const wonPopup = document.querySelector('.won');
const finalTime = document.querySelector('#finalTime');

const memoryCards = document.querySelectorAll('.card');

let isModalOpen = false;
// let timer = 0;
let isTimerStarted = false;
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
    startTimer();
  }
  else {
    hasFlippedCard = false;
    secondCard = this
//     do cards match?
   checkForMatch();
   openModal();
  }
};

function checkForMatch(){
  let isAMatch = firstCard.dataset.char === secondCard.dataset.char
   isAMatch ? disableCards() : unflipCards();
}

function disableCards(){
  firstCard.removeEventListener('click',flipCard);
  secondCard.removeEventListener('click',flipCard);

  resetBoard();
}

function unflipCards(){
  lockBoard = true;
  setTimeout( () => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
   }, 1500)
}

function resetBoard(){
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

function playAgain(){
  shuffle();
  resetTimer();
  memoryCards.forEach( card => card.classList.remove('flip'));
  memoryCards.forEach( card => card.addEventListener('click', flipCard));
}


function spinningIcon(){
  replayBtn.classList.add('rotate')
}

function shuffle(){
  memoryCards.forEach( card => {
    let randomCard = Math.floor(Math.random() * 12);
    card.style.order = randomCard;
  });
}

// MODAL
function openModal(){
  isModalOpen = true;
  if (document.querySelectorAll('.flip').length == 6) {
  timerResult();
  setTimeout(() => {
    modal.style.visibility = "visible"
  }, 1500)};
};

function closeModal(){
  if (isModalOpen) {
    modal.style.visibility = "hidden";
    // timerResult();
    resetTimer();

  }
  isModalOpen = false;
};


// TIMER
let second = 0;
let minute = 0;

let howLong;

function startTimer(){
  if (document.querySelectorAll('.flip').length !== 0){
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
  clearInterval(howLong)
}



// function startTimer(){
//   isTimerStarted = true;
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
  timerBtn.innerHTML = `
    timer <i class="fas fa-hourglass-start"></i>
  `
    clearInterval(howLong)
};

memoryCards.forEach( card => card.addEventListener('click', flipCard));

shuffle();
