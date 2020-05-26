const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
};

const showSuccess = input => {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

const isValidEmail = email =>{
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(re.test(email.value.trim())){
    showSuccess(email);
  }else{
    showError(email, 'Email is not valid');
  }

}

const checkRequired = inputArr => {
  inputArr.forEach(input => {
    if(input.value.trim() === ''){
      if (getFieldName(input) === 'Password2'){
        showError(input, `Password is required`);
      }else{
        showError(input, `${getFieldName(input)} is required`);
      }
    }else{
      showSuccess(input);
    }
  });
};

const checkLength = (input, min, max) => {
  if(input.value.length < min){
    showError(input, `${getFieldName(input)} must be at least ${min} characers`);
  }else if (input.value.length > max){
    showError(input, `${getFieldName(input)} must be less than ${min} characers`);
  }else{
    showSuccess(input);
  }
}

const checkPasswordsMatch = (input1, input2) =>{
  if (input1.value !== input2.value){
    showError(input2, 'Passwords do not match');
  }
}

const getFieldName = input =>{
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', e => {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  isValidEmail(email);
  checkPasswordsMatch(password, password2);
});




// form.addEventListener('submit', e =>{
//   e.preventDefault();
//   if (username.value === ''){
//     showError(username, 'Username is required');
//   }else{
//     showSuccess(username);
//   }

//   if (email.value === ''){
//     showError(email, 'Email is required');
//   }else if (!isValidEmail(email.value)){
//     showError(email, 'Email is not valid');
//   }else{
//     showSuccess(email);
//   }

//   if (password.value === ''){
//     showError(password, 'Password is required');
//   }else{
//     showSuccess(password);
//   }

//   if (password2.value === ''){
//     showError(password2, 'Password is required');
//   }else{
//     showSuccess(password2);
//   }
// });