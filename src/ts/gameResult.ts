import { WinHeaders } from './winHeaders'
import { Figure } from './figureArr'

export default class GameResult {
    Header: string = ''
    HeaderColor: string

    constructor(palyer: Figure, bot: Figure) {
        let playerWin: boolean | undefined

        if (palyer !== bot) {
            const h = WinHeaders.get(`${palyer}-${bot}`)
            this.Header = h ?? WinHeaders.get(`${bot}-${palyer}`)!
            playerWin = !!h
        }
        
        this.HeaderColor = playerWin === true ? 'green' : playerWin === false ? 'red' : '#5f5e5e'
        this.Header += ' ' + (playerWin ? 'Вы победили!' : playerWin === false ? 'Вы проиграли!' : 'Ничья.')
    }
}