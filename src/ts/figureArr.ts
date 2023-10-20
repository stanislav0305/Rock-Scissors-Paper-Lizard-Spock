export const figureArr = ['Rock', 'Scissors', 'Paper', 'Lizards', 'Spock'] as const
export type Figure = (typeof figureArr)[number] //преобразуем array в тип

export function genirateFigure() {
    return figureArr[Math.floor(Math.random() * 5)] as Figure
}