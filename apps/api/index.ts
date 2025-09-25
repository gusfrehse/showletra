import type { GameInfo } from '@showletra/utils';

console.log("Hello world!");

interface Puzzle {
    id: number,
    letters: string,
    published: boolean,
    date: string,
    total_score: number,
    word_count: number,
    pangram_list: string[],
    word_list: {
        word: string,
        score: number,
        pangram: boolean,
        label: any[]
    }[]
};

interface SerializedPuzzle {
    id: number,
    letters: string,
    published: boolean,
    date: string,
    total_score: number,
    word_count: number,
    pangram_list: number[],
    word_list: {
        length: number,
        score: number,
    }[]
}

interface WSMessage {
    id: number,
    word: string,
    status: "ok" | "failed",
    user: string
}

async function fetchDailyPuzzle() : Promise<Puzzle> {
    const res = await fetch("https://g1.globo.com/jogos/static/soletra.json");
    const data = await res.json();
    const puzzle = data as Puzzle;

    puzzle.word_list = puzzle
        .word_list
        .sort((a, b) =>
              a.word.length - b.word.length
              || a.word.localeCompare(b.word, "pt-BR"));
    console.log(puzzle.word_list);

    return puzzle;
}

function serializePuzzle(puzzle: Puzzle) : SerializedPuzzle {
    return {
        ...puzzle,
        pangram_list: puzzle.pangram_list.map(s => s.length),
        word_list: puzzle.word_list.map(w => {
            return {  score: w.score, length: w.word.length }
        })
    }
}

function getUserFromRequest(req: Bun.BunRequest): string {
    const url = new URL(req.url);
    const user = url.searchParams.get("user");
    return user || "anon";
}

let todayPuzzle: Puzzle = await fetchDailyPuzzle();

// run everyday
setInterval(
    () => fetchDailyPuzzle().then(puzzle => todayPuzzle = puzzle),
    24 * 60 * 60 * 1000
);

const server = Bun.serve<{ room: string, user: string }, {}>({
    development: true,
    routes: {
        "/jogo": () => Response.json(serializePuzzle(todayPuzzle)),
        "/join/:room":  (req: Bun.BunRequest<"/join/:room">, server: Bun.Server) => {
            const user = getUserFromRequest(req);

            const success = server.upgrade(req, {
                data: {
                    room: req.params.room,
                    user
                }
            });

            if (success)
                return undefined;

            return new Response("WebSocket creation error", { status: 400 });
        }
    },
    error(error) {
        console.error("ERROR:", error);
        return new Response("Error: " + error.toString());
    },
    websocket: {
        async message(ws, msg) {
            if (typeof msg !== "string") {
                // we ignore if the user sends for some reason binary data.
                console.log(`${ws.data.user}@${ws.data.room}: received binary message, ignoring.`);
                return;
            }

            console.log(`${ws.data.user}@${ws.data.room}: received word:`, msg);

            const word = todayPuzzle.word_list.findIndex(w => w.word === msg);

            const reply: WSMessage = {
                id: word,
                word: msg,
                status: "ok",
                user: ws.data.user
            };

            if (word === -1) {
                reply.status = "failed";
            }

            server.publish(ws.data.room, JSON.stringify(reply));
        },
        open(ws) {
            ws.subscribe(ws.data.room);
            console.log(`${ws.data.user}@${ws.data.room}: joined.`);
        },
        close(ws) {
            ws.unsubscribe(ws.data.room);
            console.log(`${ws.data.user}@${ws.data.room}: left.`);
        }
    }
});
