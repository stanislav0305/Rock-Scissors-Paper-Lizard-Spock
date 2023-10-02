//array to type
export const figureArr = ['Rock', 'Scissors', 'Paper', 'Lizards', 'Spock'] as const
export type Figure = (typeof figureArr)[number]