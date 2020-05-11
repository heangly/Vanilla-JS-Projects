const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('circle');
// Total Length of the circle = 2 * Math.PI * r
const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);


let duration;
const timer = new Timer(durationInput, startButton, pauseButton, {
  // note: this is just OBJ that we pass in the argument of the CLASS
  // these are function in obj that does not require keyword "function"
  onStart(totalDuration){
    duration = totalDuration;
  },
  onTick(timeRemaining){
    circle.setAttribute('stroke-dashoffset',
      perimeter * timeRemaining / duration - perimeter
    );
  },
  onComplete(){
    console.log('Timeer is completed');
  }
}
);
