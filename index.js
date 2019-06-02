resetButton = document.querySelectorAll('.reset')
resetButton.forEach(button => button.addEventListener('click', playAgain));


const modal = document.querySelector('#congratsWindow');
const closeWon = document.querySelector('.close')
closeWon.addEventListener('click', closeModal);

const wonPopup = document.querySelector('.won');

const memoryCards = document.querySelectorAll('.card');

let isModalOpen = false;
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

// MODAL

function openModal(){
  isModalOpen = true;
  if (document.querySelectorAll('.flip').length == 2) {
  setTimeout(() => {
    modal.style.visibility = "visible"
  }, 1500)};
};

function closeModal(){
  if (isModalOpen) {
    modal.style.visibility = "hidden"
  }
  isModalOpen = false;
}


memoryCards.forEach( card => card.addEventListener('click', flipCard));

shuffle();
