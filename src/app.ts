const copyright = document.getElementById('copyrightYear') as HTMLSpanElement
copyright.textContent = new Date().getFullYear().toString()

const answerHeader = document.getElementById('answerHeader')! as HTMLSpanElement

const yourAnswerImg = document.getElementById('yourAnswerImg') as HTMLImageElement
const botAnswerImg = document.getElementById('botAnswerImg') as HTMLImageElement

const ansverPanel = document.getElementsByClassName('ansver-panel')[0] as HTMLDivElement
const playAgainBtn = document.getElementById('playAgainBtn') as HTMLButtonElement

const buttons = document.querySelectorAll('.ansver-panel > button') as NodeListOf<HTMLButtonElement>


//array to type
const figureArr = ['Rock', 'Scissors', 'Paper', 'Lizards', 'Spock'] as const
type Figure = typeof figureArr[number]

// !!! Как исключить 'Rock-Rock' и остальные не существующие комбинации? Нужно ли?
const gameResults: Map<`${Figure}-${Figure}`, string> = new Map([
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
])

class WinResult {
    Header: string = '';
    Win?: boolean
}

playAgainBtn.onclick = function (event) {
    event.preventDefault();

    ansverPanel.style.display = 'block'
    playAgainBtn.style.display = 'none'

    answerHeader.textContent = ''

    botAnswerImg.className = ''
    yourAnswerImg.className = ''
}

buttons.forEach(btn => {
    btn.addEventListener('click', function handleClick(event) {
        event.preventDefault();

        ansverPanel.style.display = 'none'
        playAgainBtn.style.display = 'block'

        const btn = event.target as HTMLButtonElement
        play(btn.value as Figure)
    })
})

function play(yourAnswer: Figure) {
    yourAnswerImg.className = yourAnswer.toLocaleLowerCase()

    const botAnswer = genirateFigure()
    botAnswerImg.className = botAnswer.toLocaleLowerCase()

    const result = firstPayerWin(yourAnswer, botAnswer)
    const winColor = result.Win === true ? 'green' : result.Win === false ? 'red' : '#5f5e5e'

    answerHeader.style.color = winColor
    answerHeader.textContent = result.Header

    playAgainBtn.style.display = 'block'
}

function firstPayerWin(figure1: Figure, figure2: Figure) {
    let result = new WinResult()

    if (figure1 !== figure2) {
        const x = gameResults.get(`${figure1}-${figure2}`)
        result.Header = x ?? gameResults.get(`${figure2}-${figure1}`)!
        result.Win = !!x
    }

    result.Header += ' ' + (result.Win ? 'Вы побидили!' : result.Win === false ? 'Вы проиграли!' : 'Ничья.')

    return result
}

function genirateFigure() {
    return figureArr[Math.floor(Math.random() * 5)] as Figure
}
