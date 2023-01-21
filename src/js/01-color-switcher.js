const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const changeColorBody = document.querySelector('body')

const DELAY = 1000;
let idInterval = null;

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStoptClick);

function onBtnStartClick() {
    idInterval = setInterval(() => {
        changeColorBody.style.backgroundColor = getRandomHexColor()
    }, DELAY);
    btnStart.disabled = true;
    btnStop.disabled = false;
}

function onBtnStoptClick() {
    clearInterval(idInterval);

    btnStart.disabled = false;
    btnStop.disabled = true;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}