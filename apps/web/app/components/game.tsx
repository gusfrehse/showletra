'use client'

import { useRef, useState, useCallback, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Keyboard from "./keyboard";
import Button from "./button";
import TextInput from "./textinput";
import WordList from "./wordlist";
import { Status, StatusContainer } from "./status";
import { tailwindTextColorFromUsername } from "@/utils/colors";

import type { GameInfo, ServerMessage } from '@showletra/utils';
import { normalizeWord } from '@showletra/utils';

export default function Game() {
    const socketRef = useRef<WebSocket | null>(null);
    const [info, setInfo] = useState<GameInfo | null>(null); 
    const [guess, setGuess] = useState<string>('');
    const router = useRouter();

    const addLetter = useCallback((letter: string) => {
        setGuess((old: string) => old + letter)
    }, [setGuess]);

    useEffect(() => {
        const room = localStorage.getItem('room') || "main";
        if (!room) {
            // TODO: do something if not in any room.
            router.push('/entrar');
            return;
        }

        fetch(`http://${process.env.NEXT_PUBLIC_SERVER_URL!}/game/${room}`)
            .then(res => res.json())
            .then((data: GameInfo) => {
                setInfo(data)
            })
            .catch(err => console.error(err));
    }, [router]);

    useEffect(() => {
        if (!socketRef.current) {
            const params = new URLSearchParams();

            const user = localStorage.getItem('user');
            if (user)
                params.append('user', user);

            const room = localStorage.getItem('room') || 'main';

            const url = `ws://${process.env.NEXT_PUBLIC_SERVER_URL!}/join/${room}?${params.toString()}`;
            console.log(url);
            const socket = new WebSocket(url);
            socketRef.current = socket;

            console.log("Created websocket!!!");
        } 

        socketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data) as ServerMessage;           
            console.log("RECV", data);

            const currentUser = data.user === localStorage.getItem('user');

            if (data.status === "failed" && currentUser) {
                Status.show("text-red-500","nao existe burro");
                return;
            }

            if (data.status === "ok"
                && currentUser
                && info?.words.find(w => w.found && data.word === w.word)) {
                Status.show("text-red-500", "demorou demais irmao");
                return;
            }

            if (data.status === "ok") {
                if (info) {
                    const newWords = [...info.words];
                    newWords[data.id] = { found: true, word: data.word, user: data.user };
                    console.log(newWords);

                    setInfo({...info, words: newWords}); 

                    const statusColor = tailwindTextColorFromUsername(data.user);

                    if (currentUser) {
                        Status.show(statusColor, "boa fez alguma coisa");
                    } else {
                        Status.show(statusColor, `${data.user} achou '${data.word}'`);
                    }

                    return;
                }
            }

        }
    }, [info]);

    if (!info) {
        return <div>Hmm carregando??</div>;
    }

    const mandatoryLetter = info.letters[0];
    const availableLetters = info.letters;

    const handleGuess = () => {
        console.log("guessing", guess);

        setGuess('');

        if (!guess) {
            console.log("empty guess", guess);
            Status.show("text-red-500","faltou tentar so ne...");

            return;
        }

        if (guess.length <= 3) {
            Status.show(
                "text-red-500",
                Math.random() > 0.5 ?
                      "tem que ter mais de 3 letras. acha que a vida é fácil??"
                     :"muito pequeno (foi o que ela disse)"
            );
            return;
        }

        for (const c of guess) {
            if (!availableLetters.includes(c)) {
                console.log("non available letter", c);
                Status.show("text-red-500", "presta atencao nao pode usar " + c + "...");
                return;
            }
        }

        if (!guess.includes(mandatoryLetter)) {
            console.log("no mandatory letter", guess);
            Status.show("text-red-500","tem que ter a do meio.....");
            return;
        }

        console.log("Will send a guess", guess);
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            console.log("Sent a guess", guess);
            socketRef.current.send(guess);
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
                <TextInput autoFocus value={guess} onChange={(e) => setGuess(normalizeWord(e.target.value))} />
                <Button type='submit'>Guess</Button>
            </form>
            <StatusContainer />
            <WordList words={info.words} />
        </div>
    );
}

