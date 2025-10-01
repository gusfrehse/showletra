
export type Test = {
    test: string,
    opa: String,
};

export type Word =
    | { found: true, word: string, user: string }
    | { found: false, length: number, score: number }

export type GameInfo = {
    id: number,
    letters: string,
    date: string,
    total_score: number,
    words: Word[]
}

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
    status: "ok" | "failed",
    user: string
};


export const TEST_OBJ = { test: 100 };

