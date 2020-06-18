const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

//Keep track of current card
let currentActiveCard = 0;

//Store DOM cards
const cardsEl = [];

// DUMMY DATA for testing
// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _'
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data'
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable'
//   }
// ];

//get card from local storage
const getCardsData = () => {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

const cardsData = getCardsData();

//show number of cards
const updateCurrentText = () => {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

//create single card
const createCard = (data, index) => {
  const card = document.createElement('div');
  card.classList.add('card');

  if (index === 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
  <div class="inner-card">
    <div class="inner-card-front">
      <p>
        ${data.question}
      </p>
    </div>
    <div class="inner-card-back">
      <p>
      ${data.answer}
      </p>
    </div>
  </div>
  `;

  card.addEventListener('click', () => {
    card.classList.toggle('show-answer');
  })

  //Add to DOM Card
  cardsEl.push(card);
  cardsContainer.append(card);
  updateCurrentText();
}

//Create all cards
const createCards = () => {
  cardsData.forEach((data, index) => {
    createCard(data, index);
  });
}

createCards();

//Event Listeners

// next button
nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left';

  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsEl.length -1) {
    currentActiveCard = cardsEl.length -1;
  }

  cardsEl[currentActiveCard].className = 'card active';
  updateCurrentText();
})

//previous button
prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right';

  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = 'card active';
  updateCurrentText();
})

//show add container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

//hide add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

//Adding new card to local storage
const setCardsData = cards => {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
}

//Add new card
addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };

    createCard(newCard);

    questionEl.value = '';
    answerEl.value = '';

    addContainer.classList.remove('show');

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

//clear card button
clearBtn.addEventListener('click', () => {
  localStorage.clear();
  cards.addContainer.innerHTML = '';
  window.location.reload();
})