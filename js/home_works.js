const gmailInput = document.querySelector('#gmail_input');
const gmailButton = document.querySelector('#gmail_button');
const gmailResult = document.querySelector('#gmail_result');
const gmailComRegExp = /^\w{1,}[\w\.]{0,}\w{1,}\@gmail\.com$/;
const mailRuComRegExp = /^\w{1,}[\w\.]{0,}\w{1,}\@mail\.ru$/;

gmailButton.addEventListener('click', () => {
    if (gmailComRegExp.test(gmailInput.value) || mailRuComRegExp.test(gmailInput.value)) {
        gmailResult.innerHTML = 'Email is valid';
        gmailResult.style.color = 'purple';
        gmailResult.style.backgroundColor = 'rgba(0, 255, 0, 0.5)'; 
    } else {
        gmailResult.innerHTML = 'Email is not valid';
        gmailResult.style.color = 'black';
        gmailResult.style.backgroundColor = 'rgba(255, 0, 0, 0.5)'; 
    }
});



const childBlock = document.querySelector('.child_block');
let maxPos = 446, modeNum = 2;
let posX = 0, posY = 0;
let posBorder = maxPos;
const blockMove = setInterval(() => {
    if (posX !== posBorder) {
        posX += modeNum;
    } else if (posY !== posBorder) {
        posY += modeNum;
    } else {
        modeNum = -modeNum;
        posBorder === maxPos ? (posBorder = 0) : (posBorder = maxPos);
    }

    childBlock.style.left = `${posX}px`;
    childBlock.style.top = `${posY}px`;

    const rotation = ((posX + posY) / (2 * maxPos)) * 360;

    childBlock.style.transform = `rotate(${rotation}deg)`;

}, 12);




const startButton = document.querySelector('#start')
const stopButton = document.querySelector('#stop')
const resetButton = document.querySelector('#reset')

const minNum = document.querySelector('#minutes')
const secNum = document.querySelector('#seconds')
const mlSecNum = document.querySelector('#ml-seconds')

let mlSec = Number(mlSecNum.innerHTML)
let sec = Number(secNum.innerHTML)
let min = Number(minNum.innerHTML)
let timerIsWork = false

startButton.addEventListener('click', () => {
	if(!timerIsWork){
		const timer = setInterval(() => {
			mlSec++
			if(mlSec === 100){
				mlSec = 0
				sec++
			}
			if(sec === 60){
				sec = 0
				min++
			}
			stopButton.addEventListener('click', () => stopTimer(timer))
			resetButton.addEventListener('click', () => resetTimer(timer))
			minNum.innerHTML = String(min).padStart(2, '0')
			secNum.innerHTML = String(sec).padStart(2, '0')
			mlSecNum.innerHTML = String(mlSec).padStart(2, '0')
		}, 10)
		timerIsWork = true
	}
})

function stopTimer(timer){
	timerIsWork = false
	clearInterval(timer)
}

function resetTimer(timer){
	mlSecNum.innerHTML = '00'
	secNum.innerHTML = '00'
	minNum.innerHTML = '00'
	mlSec = 0
	sec = 0
	min = 0

	timerIsWork = false
	clearInterval(timer)
}
