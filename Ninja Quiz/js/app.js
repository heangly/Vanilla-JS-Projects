const form = document.querySelector('.quiz-form');
const result = document.querySelector('.result');
const correctAnswers = ['B', 'B', 'B', 'B'];

form.addEventListener('submit', e =>{
  e.preventDefault();
  let score = 0;
  const userAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value];

  //check answers
  userAnswers.forEach((answer, index) => answer === correctAnswers[index] ? score += 25 : score += 0)

  //scroll to the top with smooth scrolling
  scrollTo({ top: 0, behavior: 'smooth' });

  result.classList.remove('d-none');

  //animate score
  let i = 0;
  const timer = setInterval(()=>{
    //show result on page
    result.querySelector('span').innerText = `${i}%`;
    if (i === score){
      clearInterval(timer);
    }else{
      i++;
    };
  }, 30);
});

// setTimeout(()=>{
//   console.log('hi');
// },3000);

// let i = 0;
// const timer = setInterval(()=>{
//   console.log('hi');
//   i++;
//   if ( i === 5){
//     clearInterval(timer);
//   }
// }, 1000);




