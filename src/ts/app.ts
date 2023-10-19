import { Figure, genirateFigure } from './figureArr'
import GameResult from './gameResult'

const answerHeader = document.getElementById('answerHeader')! as HTMLHeadingElement

const playerImg = document.getElementById('playerImg') as HTMLImageElement
const botImg = document.getElementById('botImg') as HTMLImageElement

const ansverPanel = document.getElementsByClassName('ansver-panel')[0] as HTMLDivElement
const playAgainBtn = document.getElementById('playAgainBtn') as HTMLButtonElement

const buttons = document.querySelectorAll('.ansver-panel > button') as NodeListOf<HTMLButtonElement>


playAgainBtn.onclick = function (event) {
    event.preventDefault()

    clearGame()
}

buttons.forEach(btn => {
    btn.addEventListener('click', function handleClick(event) {
        event.preventDefault()

        const btn = event.target as HTMLButtonElement
        play(btn.value as Figure)
    })
})

function clearGame() {
    setAnswerHeader()
    toogleAnsverPanel(true)
    setImages()
}

function play(player: Figure) {
    const bot = genirateFigure()
    setImages(player, bot)

    const result = new GameResult(player, bot)
    setAnswerHeader(result.Header, result.HeaderColor)
    toogleAnsverPanel(false)
}

function setAnswerHeader(header: string = '', headerColor: string = '#000') {
    answerHeader.style.color = headerColor
    answerHeader.textContent = header
}

function toogleAnsverPanel(show: boolean) {
    ansverPanel.style.display = show ? 'block' : 'none'
    playAgainBtn.style.display = show ? 'none' : 'block'
}

function setImages(player: Figure | undefined = undefined, bot: Figure | undefined = undefined) {
    playerImg.className = player ? player.toLocaleLowerCase() : ''
    botImg.className = bot ? bot.toLocaleLowerCase() : ''
}
