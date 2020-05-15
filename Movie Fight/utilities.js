const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    // clear the previous timeout id
    if (timeoutId){
      clearTimeout(timeoutId);
    }
    // prevent fetching request IMMEDIATELY whenever user type in the input box
    timeoutId = setTimeout(()=>{
      // call the func function and passing all arguments in args array seperately to that function
      // apply -> taking an array and pass them to function.
      func.apply(null, args);
    }, delay);
  };
};