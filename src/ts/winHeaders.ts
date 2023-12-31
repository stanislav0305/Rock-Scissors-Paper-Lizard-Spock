import { Figure } from './figureArr'

//for IE
import 'core-js/actual/map'

export const WinHeaders: Map<`${Figure}-${Figure}`, string> = new Map([
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