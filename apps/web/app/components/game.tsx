'use client'

import { useRef, useState, useCallback, useEffect } from "react";
import Keyboard from "./keyboard";
import Button from "./button"
import TextInput from "./textinput"
import WordList from "./wordlist"

import { TEST_OBJ } from '@showletra/utils';

console.log(TEST_OBJ.test);

interface GameProps {
    info: GameInfo
};

export type Word =
    | { found: true, word: string, user: string }
    | { found: false, length: number, score: number };

export default function Game({ info }: GameProps) {
    const socketRef = useRef<WebSocket | null>(null);
    const [guess, setGuess] = useState<string>('');
    const [words, setWords] = useState<Word[]>(
        info.word_list.map(w => {return { found: false, length: w.length, score: w.score }})
    );
    const [error, setError] = useState<{timeout: NodeJS.Timeout, message: string} | null>(null);

    const addLetter = useCallback((letter: string) => {
        setGuess((old: string) => old + letter)
    }, [setGuess]);

    const showError = useCallback((message: string) => {
        if (error?.timeout)
            clearTimeout(error.timeout);

        setError({
            timeout: setTimeout(() => setError(null), 5000),
            message
        });
    }, [error?.timeout]);

    useEffect(() => {
        if (!socketRef.current) {
            const params = new URLSearchParams();

            const user = localStorage.getItem('user');
            if (user)
                params.append('user', user);

            const url = "ws://" + process.env.NEXT_PUBLIC_SERVER_URL! + "/join/main?" + params.toString();
            console.log(url);
            const socket = new WebSocket(url);
            socketRef.current = socket;

            console.log("Created websocket!!!");
        } 

        socketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data) as {
                id: number,
                word: string,
                status: "ok" | "failed",
                user: "string"
            };
            
            console.log("RECV", data);
            console.log("found words", words);

            if (data.status === "failed") {
                showError("nao existe burro");
                return;
            }

            if (data.status === "ok"
                && words.find(w => w.found && data.word === w.word)) {
                showError("demorou demais irmao");
                return;
            }

            if (data.status === "ok") {
                const newWords = [...words];
                newWords[data.id] = { found: true, word: data.word, user: data.user };
                console.log(newWords);

                setWords(newWords);

                return;
            }
        }
    }, [words, showError]);

    if (!info) {
        return <div>Hmm carregando??</div>;
    }

    const mandatoryLetter = info.letters[0];
    const availableLetters = info.letters;

    const handleGuess = () => {
        console.log("guessing", guess);
        if (!guess) {
            console.log("empty guess", guess);
            showError("faltou tentar so ne...");
            setGuess('');
            return;
        }

        if (guess.length <= 3) {
            console.log("", guess);
            showError(Math.random() > 0.5 ?
                      "tem que ter mais de 3 letras. acha que a vida é fácil??"
                     :"muito pequeno (foi o que ela disse)");
            setGuess('');
            return;
        }

        for (const c of guess) {
            if (!availableLetters.includes(c)) {
                console.log("non available letter", c);
                showError("presta atencao nao pode usar " + c + "...");
                setGuess('');
                return;
            }
        }

        if (!guess.includes(mandatoryLetter)) {
            console.log("no mandatory letter", guess);
            showError("tem que ter a do meio.....");
            setGuess('');
            return;
        }

        console.log("Will send a guess", guess);
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            console.log("Sent a guess", guess);
            socketRef.current.send(guess);
            setGuess('');
        }
    }

    return (
        <div className="flex flex-col w-full">
            <Keyboard
                availableLetters={availableLetters}
                mandatoryLetter={mandatoryLetter}
                addLetter={addLetter}
            />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleGuess();
                }}
            >
                <TextInput autoFocus value={guess} onChange={(e) => setGuess(e.target.value)} />
                <Button type='submit'>Guess</Button>
            </form>
            <p className="text-red-500">{error?.message}</p>
            <WordList words={words} />
        </div>
    );
}

