const balance = document.querySelector('#balance');
const money_plus = document.querySelector('#money-plus');
const money_minus = document.querySelector('#money-minus');
const list = document.querySelector('#list');
const form = document.querySelector('#form');
const text = document.querySelector('#text');
const amount = document.querySelector('#amount');

// const dummyTransactions = [
//   {id:1, text: 'Flower', amount: -20},
//   {id:2, text: 'Salary', amount: 300},
//   {id:3, text: 'Book', amount: -10},
//   {id:4, text: 'Camera', amount: 150},
// ];

const localStorageTransaction = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null? localStorageTransaction : [];


const updateLocalStorage = () =>{
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

//add transaction
const addTransaction = e => {
  e.preventDefault();

  if(!text.value.trim() || !amount.value.trim()){
    alert('please add a text and amount');
  }else{
    const transaction = {
      id : genrateID(),
      text:text.value,
      amount: Number(amount.value)
    };
    
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
}

//Generate random ID
const genrateID = () =>{
  return Math.floor(Math.random()*100000000);
}

//Remove transaction by ID
const removeTransaction = id => {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  init();
}

//Add transacgtions to DOM list
const addTransactionDOM = transaction =>{
  //get sign
  const sign = transaction.amount < 0 ?'-' : '+';
  const item = document.createElement('li');

  //Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `
  ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
  <button  class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(item);
}


//update the balance, income and expense
const updateValues = () => {
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, curr) => (acc += curr), 0).toFixed(2);

  const income = amounts
                      .filter(item => item > 0)
                      .reduce((acc, item)=> (acc += item), 0)
                      .toFixed(2);

  const expense = amounts
                        .filter(item => item < 0)
                        .reduce((acc, item) => (acc += item), 0) * -1
                        .toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

//Init App
const init = () => {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction)



