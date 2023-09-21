"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const html_elements_1 = require("./html-elements");
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
        this.Header = 'Выбирете ответ:';
        this.Result = '';
    }
}
initAnswerHeader();
function initAnswerHeader() {
    html_elements_1.answerHeader.textContent = 'Выбирете ответ:';
    html_elements_1.answerHeader.style.color = 'silver';
}
html_elements_1.playAgainBtn.onclick = function (event) {
    event.preventDefault();
    html_elements_1.ansverPanel.style.display = 'block';
    html_elements_1.playAgainBtn.style.display = 'none';
    initAnswerHeader();
    html_elements_1.ansverResult.textContent = '';
    html_elements_1.botAnswerImg.className = '';
    html_elements_1.yourAnswerImg.className = '';
};
html_elements_1.buttons.forEach(btn => {
    btn.addEventListener('click', function handleClick(event) {
        event.preventDefault();
        html_elements_1.ansverPanel.style.display = 'none';
        html_elements_1.playAgainBtn.style.display = 'block';
        const btn = event.target;
        play(btn.value);
    });
});
function play(yourAnswer) {
    html_elements_1.yourAnswerImg.className = yourAnswer.toLocaleLowerCase();
    const botAnswer = genirateFigure();
    html_elements_1.botAnswerImg.className = botAnswer.toLocaleLowerCase();
    const result = firstPayerWin(yourAnswer, botAnswer);
    const winColor = result.Win === true ? 'green' : result.Win === false ? 'red' : 'silver';
    html_elements_1.answerHeader.style.color = winColor;
    html_elements_1.answerHeader.textContent = result.Header;
    html_elements_1.ansverResult.textContent = result.Result;
    html_elements_1.ansverResult.style.color = winColor;
    html_elements_1.playAgainBtn.style.display = 'block';
}
function firstPayerWin(figure1, figure2) {
    let result = new WinResult();
    if (figure1 !== figure2) {
        const x = gameResults.get(`${figure1}-${figure2}`);
        result.Header = x !== null && x !== void 0 ? x : gameResults.get(`${figure2}-${figure1}`);
        result.Win = !!x;
    }
    result.Result = result.Win ? 'Вы побидили!' : result.Win === false ? 'Вы проиграли!' : 'Ничья.';
    return result;
}
function genirateFigure() {
    return figureArr[Math.floor(Math.random() * 5)];
}
