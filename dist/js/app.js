"use strict";
var copyright = document.getElementById('copyrightYear');
copyright.textContent = new Date().getFullYear().toString();
var answerHeader = document.getElementById('answerHeader');
var yourAnswerImg = document.getElementById('yourAnswerImg');
var botAnswerImg = document.getElementById('botAnswerImg');
var ansverPanel = document.getElementsByClassName('ansver-panel')[0];
var playAgainBtn = document.getElementById('playAgainBtn');
var buttons = document.querySelectorAll('.ansver-panel > button');
var figureArr = ['Rock', 'Scissors', 'Paper', 'Lizards', 'Spock'];
var gameResults = new Map([
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
var WinResult = (function () {
    function WinResult() {
        this.Header = '';
    }
    return WinResult;
}());
playAgainBtn.onclick = function (event) {
    event.preventDefault();
    ansverPanel.style.display = 'block';
    playAgainBtn.style.display = 'none';
    answerHeader.textContent = '';
    botAnswerImg.className = '';
    yourAnswerImg.className = '';
};
buttons.forEach(function (btn) {
    btn.addEventListener('click', function handleClick(event) {
        event.preventDefault();
        ansverPanel.style.display = 'none';
        playAgainBtn.style.display = 'block';
        var btn = event.target;
        play(btn.value);
    });
});
function play(yourAnswer) {
    yourAnswerImg.className = yourAnswer.toLocaleLowerCase();
    var botAnswer = genirateFigure();
    botAnswerImg.className = botAnswer.toLocaleLowerCase();
    var result = firstPayerWin(yourAnswer, botAnswer);
    var winColor = result.Win === true ? 'green' : result.Win === false ? 'red' : '#5f5e5e';
    answerHeader.style.color = winColor;
    answerHeader.textContent = result.Header;
    playAgainBtn.style.display = 'block';
}
function firstPayerWin(figure1, figure2) {
    var result = new WinResult();
    if (figure1 !== figure2) {
        var x = gameResults.get("".concat(figure1, "-").concat(figure2));
        result.Header = x !== null && x !== void 0 ? x : gameResults.get("".concat(figure2, "-").concat(figure1));
        result.Win = !!x;
    }
    result.Header += ' ' + (result.Win ? 'Вы побидили!' : result.Win === false ? 'Вы проиграли!' : 'Ничья.');
    return result;
}
function genirateFigure() {
    return figureArr[Math.floor(Math.random() * 5)];
}
