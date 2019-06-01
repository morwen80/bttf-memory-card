const memoryCards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard(){
  this.classList.add('flip');

  if (!hasFlippedCard) {
//     first click
    hasFlippedCard = true;
    firstCard = this;
  }
  else {
//     second click
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
}

function unflipCards(){
  setTimeout( () => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip')
   }, 1500)
}

memoryCards.forEach( card => card.addEventListener('click', flipCard));
