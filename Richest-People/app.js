const main = document.querySelector('#main');
const addUserBtn = document.querySelector('#add-user');
const doubleBtn = document.querySelector('#double');
const showMillionairesBtn = document.querySelector('#show-millionaires');
const sortBtn = document.querySelector('#sort');
const calculateWealthBtn = document.querySelector('#calculate-wealth');
const deleteOne = document.querySelector('#delete-one');
const deleteAll = document.querySelector('#delete-all');

let data = [];

// add new ovj to data arr
const addData = obj => {
  data.push(obj);
}

const formatMoney = number =>{
  return '$ ' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

const updateDom = (providedData = data) =>{
  // clear main div
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.append(element);
  })
};

const doubleMoney = () => {
  data = data.map(user => {
    return {...user, money: user.money*2};
  });
  updateDom();
}

const sortByRichest = () =>{
  data.sort((a,b) => b.money - a.money);
  updateDom();
}

const showMillionaires = () =>{
  data = data.filter(d => d.money >= 1000000);
  updateDom();
}

const calculateWealth = () =>{
  const wealth = data.reduce((acc, curr) => (acc += curr.money), 0);
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
  main.append(wealthEl);
}

// fetch random user and add money
const getRandomUser = async () => {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  const user = data.results[0]

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000) + 1
  };

  addData(newUser);
  updateDom();
}

const deleteAllUsers = () =>{
  data = [];
  updateDom();
}

const deleteUser = () =>{
  data.pop();
  updateDom();
}

//event listners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
deleteOne.addEventListener('click', deleteUser);
deleteAll.addEventListener('click', deleteAllUsers);

// calling default users
getRandomUser();
getRandomUser();
getRandomUser();


