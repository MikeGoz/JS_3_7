// Task 3.7

class Stopwatch extends React.Component {
  constructor(display) {
    super();  
    this.running = false;
    this.display = display;
    this.reset();
    this.print(this.times);
  }
  reset() { 
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
  }
  print() { 
    this.display.innerText = this.format(this.times);
  }
  format(times) { 
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
  }
  start() {
    if (!this.running) {
      this.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }
  step() {
    if (!this.running) return;
    this.calculate();
    this.print();
  }
  calculate() {
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
      this.times.seconds += 1;
      this.times.miliseconds = 0;
    }
    if (this.times.seconds >= 60) {
      this.times.minutes += 1;
      this.times.seconds = 0;
    }
  }
  stop() {
    this.running = false;
    clearInterval(this.watch);
  }
  clear() { 
    this.stop();
    this.reset();
    this.print(); 
  }
  catch() { 
    const lapList = document.getElementById('results');
    const newLap = document.createElement('li');
    const newLapArray = lapList.getElementsByTagName('li');
        
    newLap.innerHTML = `${newLapArray.length + 1} lap : ${this.format(this.times)}`;
    lapList.appendChild(newLap);
    //console.log(newLapArray);
  }
  catchClear() {
    const arrayToClear = document.getElementById('results');
    arrayToClear.innerHTML = '';
    }
}
function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result; 
}

const stopwatch = new Stopwatch(
  document.querySelector('.stopwatch'));

const startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());
const stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());  
const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => stopwatch.clear());
const catchButton = document.getElementById('catch');
catchButton.addEventListener('click', () => stopwatch.catch());
const catchClearButton = document.getElementById('catchClear');
catchClearButton.addEventListener('click', () => stopwatch.catchClear());