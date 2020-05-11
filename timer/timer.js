class Timer{
  constructor(durationInput, startButton, pauseButton, callbacks){
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;

    if(callbacks){
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }
    
    // calling the method (instance of the class Timer)
    this.startButton.addEventListener('click', this.start);
    this.pauseButton.addEventListener('click', this.pause);
  }

  start = () => {
    // checking the instance property value of the class Timer
    if (this.onStart){
      // invoke the callback method that is stored inside the onStart proerty.
      this.onStart(this.timeRemaining);
    }
    this.tick();
    this.interval = setInterval(this.tick, 20);
  };

  pause = () => {
    clearInterval(this.interval);
  };

  tick = () => {
    if (this.timeRemaining <= 0){
      this.pause();
      if(this.onComplete){
        this.onComplete();
      }
    }else{
      // the left side is Setter, and the right side is Getter
      // you do not () when calling getting or setter method.
      this.timeRemaining = this.timeRemaining - 0.02;
      if (this.onTick){
        this.onTick(this.timeRemaining);
      }
    }
  };
  
  // getter
  get timeRemaining(){
    return parseFloat(this.durationInput.value);
  }
  
  //setter 
  set timeRemaining(time){
    this.durationInput.value = time.toFixed(2);
  }
}