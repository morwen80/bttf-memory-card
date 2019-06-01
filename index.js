resetButton = document.querySelector('#reset')
resetButton.addEventListener('click', playAgain);

const memoryCards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

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
  memoryCards.forEach( card => card.classList.remove('flip'));
  memoryCards.forEach( card => card.addEventListener('click', flipCard));
}

function shuffle(){
  memoryCards.forEach( card => {
    let randomCard = Math.floor(Math.random() * 12);
    card.style.order = randomCard;
  });
}


// (function shuffle(){
//   memoryCards.forEach( card => {
//     let randomCard = Math.floor(Math.random() * 12);
//     card.style.order = randomCard;
//   });
// })();

memoryCards.forEach( card => card.addEventListener('click', flipCard));

shuffle();
