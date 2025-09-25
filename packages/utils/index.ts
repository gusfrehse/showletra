
export type Test = {
    test: string,
    opa: String,
};

export interface GameInfo {
    id: number,
    letters: string,
    published: boolean,
    date: string,
    total_score: number,
    word_count: number,
    pangram_count: number,
    pangram_list: number[],
    word_list: {
        id: number,
        score: number,
        length: number,
        pangram: boolean,
    }[]
}

export const TEST_OBJ = { test: 100 };

