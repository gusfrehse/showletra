import type { GameInfo, ServerMessage } from '@showletra/utils';
import { normalizeWord } from '@showletra/utils';

console.log("Hello world!");

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST',
    'Access-Control-Allow-Headers': 'Content-Type',
};

type GameInput = {
    id: number,
    letters: string,
    published: boolean,
    date: string,
    total_score: number,
    word_count: number,
    pangram_count: number,
    pangram_list: number[],
    word_list: {
        word: string,
        score: number,
        pangram: boolean,
        label: string[]
    }[]
}

export type GameBase = {
    id: number,
    letters: string,
    date: string,
    total_score: number,
    word_list: {
        id: number,
        word: string,
        score: number,
        pangram: boolean,
        label: string[]
    }[]
}

async function fetchDailyPuzzle() : Promise<GameBase> {
    const res = await fetch("https://g1.globo.com/jogos/static/soletra.json");
    const data = await res.json();
    const input = data as GameInput;

    let wordId = 0;
    const base: GameBase = {
        id: input.id,
        letters: input.letters,
        date: input.date,
        total_score: input.total_score,
        word_list:  input
            .word_list
            .sort((a, b) => a.word.length - b.word.length || a.word.localeCompare(b.word, "pt-BR"))
            .map(w => {
                return {
                    id: wordId++,
                    word: w.word,
                    score: w.score,
                    label: w.label,
                    pangram: w.pangram
                }
            })
    }

    return base;
}

function getUserFromRequest(req: Bun.BunRequest): string {
    const url = new URL(req.url);
    const user = url.searchParams.get("user");
    return user || "anon";
}

function getRoomFromRequest(req: Bun.BunRequest<"/join/:room">): string {
    const room = req.params.room;
    return room || "main";
}

/// Base game, with answers
let todayPuzzle: GameBase = await fetchDailyPuzzle();

// run everyday
setInterval(
    () => fetchDailyPuzzle().then(puzzle => todayPuzzle = puzzle),
    24 * 60 * 60 * 1000
);

function emptyGameInfo(base: GameBase): GameInfo {
    return {
        id: base.id,
        letters: base.letters,
        date: base.date,
        total_score: base.total_score,
        words: base.word_list.map(w => {
            return {
                found: false,
                length: w.word.length,
                score: w.score
            }
        })
    }
}

let rooms = new Map<string, GameInfo>(); 

function getRoom(room: string): GameInfo {
    if (!rooms.has(room)) {
        console.log(`no room named ${room}, creating one.`);
        rooms.set(room, emptyGameInfo(todayPuzzle));
    }

    return rooms.get(room)!;
}

const server = Bun.serve<{ room: string, user: string }, {}>({
    development: true,
    routes: {
        "/game/:room": {
            GET: (req: Bun.BunRequest<"/game/:room">) => {
                console.log(`> ${req.method}:${req.url}`);
                return Response.json(getRoom(req.params.room), {
                    status: 200,
                    headers: CORS_HEADERS
                })
            }
        },
        "/join/:room":  {
            GET: (req: Bun.BunRequest<"/join/:room">, server: Bun.Server) => {
                console.log(`> ${req.method}:${req.url}`);
                const user = getUserFromRequest(req);
                const room = getRoomFromRequest(req);

                const success = server.upgrade(req, { data: { room, user } });

                if (success)
                    return undefined;

                return new Response("WebSocket creation error", { status: 400 });
            }
        }
    },
    fetch(req) {
        console.log(`> ${req.method}:${req.url}`);
        if (req.method === "OPTIONS") {
            return new Response('Departed', { headers: CORS_HEADERS });
        }
    },
    error(error) {
        console.error("ERROR:", error);
        return new Response("Error: " + error.toString());
    },
    websocket: {
        async message(ws, msg) {
            if (typeof msg !== "string") {
                // we ignore if the user sends, for some reason, binary data.
                console.log(`${ws.data.user}@${ws.data.room}: received binary message, ignoring.`);
                return;
            }

            msg = normalizeWord(msg);

            console.log(`${ws.data.user}@${ws.data.room}: received word "${msg}".`);

            const wordIndex = todayPuzzle.word_list.findIndex(w => w.word === msg);
            const word = todayPuzzle.word_list[wordIndex]?.label[0] ?? msg; 

            const reply: ServerMessage = {
                id: wordIndex,
                word,
                status: "ok",
                user: ws.data.user
            };

            if (wordIndex === -1) {
                reply.status = "failed";
            }

            server.publish(ws.data.room, JSON.stringify(reply));
            const gameInfo = rooms.get(ws.data.room);
            if (gameInfo) {
                gameInfo.words[wordIndex] = {
                    found: true,
                    word,
                    user: ws.data.user
                }
            }
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
