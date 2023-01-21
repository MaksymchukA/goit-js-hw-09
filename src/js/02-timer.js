import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const datetimePickerInput = document.getElementById('datetime-picker');
const btnClick = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

const DELAY = 1000;
let deltaTime = 0;
let timerId = null;
let formatTime = null;

// btnClick.setAttribute('disabled', true)

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        currentDeltaTime(selectedDates[0])
  }
}

flatpickr(datetimePickerInput, options);

btnClick.addEventListener('click', onBtnClick);

function onBtnClick() {
    timerId = setInterval(() => {
        // btnStartRef.setAttribute('disabled', true);
            // imputDatePickerRef.setAttribute('disabled', true);
          
            deltaTime -= 10
          
            // if (seconds.textContent <= 0 && minutes.textContent <= 0) {
            //   clearInterval(timerId);
            // } else {
                formatTime = convertMs(deltaTime);

                updateTimer(formatTime);
            // }
    }), DELAY;
}

function currentDeltaTime(selectedDates) {
    // btnClick.setAttribute('disabled', true);

    const currentTime = Date.now();
    deltaTime = selectedDates - currentTime;

    deltaTime -= 10;

    formatTime = convertMs(deltaTime);

    updateTimer(formatTime);

    if (deltaTime <= 0) {
        stopTimer();
        alert('Please choose a date in the future');
    }

    // btnClick.removeAttribute('disabled');
}

function stopTimer() {
    // btnClick.setAttribute('disabled', true);
    clearInterval(timerId);
    formatTime = convertMs(0);
    updateTimer(formatTime);
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }

function addLeadingZero(value) {
    return String(value).padStart(2, '0')
}

function updateTimer(formatTime) {
    // або зробити деструктуризацію 
    // function updateTimer({days, hours, minutes, seconds})
    days.textContent = formatTime.days;
    hours.textContent = formatTime.hours;
    minutes.textContent = formatTime.minutes;
    seconds.textContent = formatTime.seconds;
}