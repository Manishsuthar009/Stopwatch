const resetButton = document.getElementsByClassName("reset")[0];
const playButton = document.getElementsByClassName("play")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const minute = document.getElementsByClassName("minute")[0];
const second = document.getElementsByClassName("sec")[0];
const miniSecond = document.getElementsByClassName("msec")[0];
const laps = document.getElementsByClassName("laps")[0];
const clearButton = document.getElementsByClassName("lap-clear-button")[0];
const bg = document.getElementsByClassName("outer-container")[0];


let isPlay = false;
let min;
let minCounter = 0;
let sec;
let secCounter = 0;
let msec;
let msecCounter = 0;
let lapItem = 0;
let isReset = false;

const toggleButton = () => {
  resetButton.classList.remove('hidden');
  lapButton.classList.remove('hidden');
}

const play = () => {
  if(!isPlay && !isReset){
    playButton.innerHTML = "Pause";
    bg.classList.add("animation-bg");
    min = setInterval(() => {
      minute.innerHTML = `${++minCounter}`;
    }, 60*1000);

    sec = setInterval(() => {
      if(secCounter === 60){
        secCounter = 0;
      }
      second.innerHTML = ` &nbsp;${++secCounter} :`;
    }, 1000);

    msec = setInterval(() => {
      if(msecCounter === 100){
        msecCounter = 0;
      }
      miniSecond.innerHTML = `&nbsp;${++msecCounter}`;
    }, 10);

    isPlay = true;
    isReset = true;
  }else{
    playButton.innerHTML = "Play";
    clearInterval(min);
    clearInterval(sec);
    clearInterval(msec);
    isPlay = false;
    isReset = false;
    bg.classList.remove("animation-bg");
  }
  toggleButton();
}

const reset = () => {
  isReset = true;
  play();
  minute.innerHTML = `&nbsp;0 :`;
  second.innerHTML = `&nbsp;0 :`;
  miniSecond.innerHTML = `&nbsp;0`;
  resetButton.classList.add('hidden');
  lapButton.classList.add('hidden');
}

const lap = () => {
  const li = document.createElement("li");
  const number = document.createElement("span");
  const timeStamp = document.createElement("span");
  
  li.setAttribute("class" , "lap-item" );
  number.setAttribute("class", "number");
  timeStamp.setAttribute("class", "time-stamp");

  number.innerText = `#${++lapItem}`;
  timeStamp.innerHTML = `${minCounter} : ${secCounter} : ${msecCounter}`;

  li.append(number , timeStamp);
  laps.append(li);

  clearButton.classList.remove("hidden");
} 

const clearAll = () => {
  laps.innerHTML = '';
  laps.append(clearButton);
  clearButton.classList.add("hidden");
}

resetButton.addEventListener('click', reset)
playButton.addEventListener('click',play)
lapButton.addEventListener('click', lap);
clearButton.addEventListener('click', clearAll);


