"use strict";
const answerHeader = document.getElementById('answerHeader');
const yourAnswerImg = document.getElementById('yourAnswerImg');
const botAnswerImg = document.getElementById('botAnswerImg');
const ansverPanel = document.getElementsByClassName('ansver-panel')[0];
const playAgainBtn = document.getElementById('playAgainBtn');
const buttons = document.querySelectorAll('.ansver-panel > button');
const figureArr = ['Rock', 'Scissors', 'Paper', 'Lizards', 'Spock'];
const gameResults = new Map([
    ['Rock-Scissors', 'Камень ломает ножницы.'],
    ['Rock-Lizards', 'Камень бьёт ящерицу.'],
    ['Scissors-Paper', 'Ножницы режут бумагу.'],
    ['Scissors-Lizards', 'Ножницы обезглавливают ящерицу.'],
    ['Paper-Spock', 'Бумага опровергает Спока.'],
    ['Paper-Rock', 'Бумага накрывает камень.'],
    ['Lizards-Paper', 'Ящерицу съедает бумагу.'],
    ['Lizards-Spock', 'Ящерица отравляет Спока.'],
    ['Spock-Scissors', 'Спок ломает ножницы.'],
    ['Spock-Rock', 'Спок испаряет камень.'],
]);
class WinResult {
    constructor() {
        this.Header = '';
    }
}
playAgainBtn.onclick = function (event) {
    event.preventDefault();
    ansverPanel.style.display = 'block';
    playAgainBtn.style.display = 'none';
    answerHeader.textContent = '';
    botAnswerImg.className = '';
    yourAnswerImg.className = '';
};
buttons.forEach(btn => {
    btn.addEventListener('click', function handleClick(event) {
        event.preventDefault();
        ansverPanel.style.display = 'none';
        playAgainBtn.style.display = 'block';
        const btn = event.target;
        play(btn.value);
    });
});
function play(yourAnswer) {
    yourAnswerImg.className = yourAnswer.toLocaleLowerCase();
    const botAnswer = genirateFigure();
    botAnswerImg.className = botAnswer.toLocaleLowerCase();
    const result = firstPayerWin(yourAnswer, botAnswer);
    const winColor = result.Win === true ? 'green' : result.Win === false ? 'red' : '#5f5e5e';
    answerHeader.style.color = winColor;
    answerHeader.textContent = result.Header;
    playAgainBtn.style.display = 'block';
}
function firstPayerWin(figure1, figure2) {
    let result = new WinResult();
    if (figure1 !== figure2) {
        const x = gameResults.get(`${figure1}-${figure2}`);
        result.Header = x !== null && x !== void 0 ? x : gameResults.get(`${figure2}-${figure1}`);
        result.Win = !!x;
    }
    result.Header += ' ' + (result.Win ? 'Вы побидили!' : result.Win === false ? 'Вы проиграли!' : 'Ничья.');
    return result;
}
function genirateFigure() {
    return figureArr[Math.floor(Math.random() * 5)];
}
