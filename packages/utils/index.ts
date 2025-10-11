/**
 * Basic word type.
 */
export type Word =
    | { found: true, word: string, user: string }
    | { found: false, length: number, score: number }

/**
 * Basic data for a game.
 */
export type GameInfo = {
    id: number,
    letters: string,
    date: string,
    total_score: number,
    words: Word[]
}

/**
 * Normalizes a word, removing acentuation, lower cases and trims
 */
export function normalizeWord(str: string): string {
    return str
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
}

/**
 * A message sent from the server.
 */
export interface ServerMessage {
    id: number,
    word: string,
    status:
        | "ok"
        | "failed-not-found"
        | "failed-already-found",
    user: string
};

