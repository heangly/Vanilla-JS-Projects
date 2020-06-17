const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];

//Init word
let randomWord;

//Init score
let score = 0;

//Init time
let time = 10;

//setting difficulty from local storage, medium by default
let difficulty  = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//set difficulty select value
difficultySelect.value = difficulty;
//Focus on text on start
text.focus();

//Generate random word
const getRandomWord = () => words[Math.floor(Math.random() * words.length)]

// Add word to DOM
const addWordToDOM = () => {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

// Update score
const updateScore = () => {
  score ++;
  scoreEl.innerText = score;
}

//game over, show end screen
const gameOver = () => {
  endgameEl.innerHTML = `
  <h1> Time ran out </h1>
  <p> Your final score is ${score} </p>
  <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = 'flex';
}

const updateTime = () => {
  time --;
  timeEl.innerText = time + 's';

  if (time === 0){
    clearInterval(timeInterval);
    //end game
    gameOver();
  }
}

//start counting down
const timeInterval = setInterval(updateTime, 1000);

addWordToDOM();

//Event Listeners

//typing
text.addEventListener('input', e => {
  const insertedText = e.target.value;

  if(insertedText === randomWord){
    e.target.value = '';
    addWordToDOM();
    updateScore();
    
    if (difficulty === 'hard'){
      time += 2;
    }else if (difficulty === 'medium'){
      time += 3;
    }else{
      time += 5;
    }

  }
});

//settings btn click
settingsBtn.addEventListener('click', () => {
  settings.classList.toggle('hide');
})

//settings select
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});