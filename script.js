const rootEl = document.documentElement;
const widgetBox = document.querySelector(".widgetBtnContainer");
const muteAlarmBtn = document.querySelector(".muteAlarmBtn");
const widgetBtnToggle = document.querySelector(".widgetBtnToggle");
const modeIcon = document.querySelector(".modeIcon");
const hr = document.querySelector(".hr");
const min = document.querySelector(".min");
const sec = document.querySelector(".sec");
const fulldate = document.querySelector(".fulldate");
const dateTimePicker = document.getElementById("dateTimePicker");
const is24HourBtn = document.querySelector(".is24HourBtn");
const currTimeFormat = document.querySelector(".currTimeFormat");
const alarmEl = document.querySelector(".alarmEl");

document.addEventListener("DOMContentLoaded", clock);

let is24Hour = false;

//CHECK THE STORED THEME MODE IN THE LOCALSTORAGE AND APPLY IT TO THE DOC ELEMENT

if (localStorage.getItem("theme") === "dark") {
  rootEl.classList.add("dark");
  modeIcon.setAttribute("name", "moon-outline");
}

//CALLBACK FUNCTION THAT HANDLES THE TOGGLING
function toggleTheme(e) {
  const button = e.target.closest(".widgetBtnToggle");
  rootEl.classList.toggle("dark");

  const isDarkMode = rootEl.classList.contains("dark");

  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  modeIcon.setAttribute("name", isDarkMode ? "moon-outline" : "sunny-outline");
  button.classList.toggle("right-0.5");
}

//BUTTON ON WHICH THE TOGGLE THEME EVENT IS ATTACHED TO
widgetBtnToggle.addEventListener("click", toggleTheme);

//DIGITAL CLOCK
function clock() {
  const now = new Date();

  fulldate.textContent = now.toDateString();

  let hours = now.getHours();
  let mins = now.getMinutes();
  let secs = now.getSeconds();

  let amOrpm;

  if (!is24Hour) {
    amOrpm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
  }

  hours = hours < 10 ? "0" + hours : hours;
  mins = mins < 10 ? "0" + mins : mins;
  secs = secs < 10 ? "0" + secs : secs;

  hr.textContent = hours;
  min.textContent = mins;
  sec.textContent = secs;
}

setInterval(() => {
  clock();
}, 1000);

is24HourBtn.addEventListener("click", () => {
  is24Hour = !is24Hour;
  currTimeFormat.textContent = is24Hour ? "24 Hour" : "12 Hour";
});

//ALARM CLOCK
const audio = new Audio();
audio.src = "nokia_alarm_clock.mp3";
audio.loop = true;

function ringAlarm() {
  audio.currentTime = 0;
  audio.play();
}

function stopAlarm() {
  audio.currentTime = 0;
  audio.pause();
}

dateTimePicker.addEventListener("change", (e) => {
  const value = e.target.value;
  const alarmTime = new Date(value).getTime();
  const currTime = Date.now();

  alarmEl.textContent = `${new Date(value).getHours()} : ${new Date(value).getMinutes()}`;

  if (alarmTime <= currTime) {
    alert("Please select a future time");
    return;
  }

  const ringAt = alarmTime - currTime;

  setTimeout(() => {
    ringAlarm();
  }, ringAt);
});

muteAlarmBtn.addEventListener("click", stopAlarm);
