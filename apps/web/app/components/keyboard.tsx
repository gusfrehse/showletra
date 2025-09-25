import Letter from './letter';

interface KeyboardProps {
    availableLetters: string,
    mandatoryLetter: string,
    addLetter: (letter: string) => void
};

export default function Keyboard({ availableLetters, mandatoryLetter, addLetter }: KeyboardProps) {
    return (
        <div className="flex flex-col w-full max-w-[500px]">
            <div className="flex gap-2 justify-center">
                <Letter letter={availableLetters[1]} addLetter={addLetter} />
                <Letter letter={availableLetters[2]} addLetter={addLetter} />
            </div>
            <div className="flex gap-2 justify-center">
                <Letter letter={availableLetters[3]} addLetter={addLetter} />
                <Letter letter={mandatoryLetter} addLetter={addLetter} />
                <Letter letter={availableLetters[4]} addLetter={addLetter} />
            </div>
            <div className="flex gap-2 justify-center">
                <Letter letter={availableLetters[5]} addLetter={addLetter} />
                <Letter letter={availableLetters[6]} addLetter={addLetter} />
            </div>
        </div>
    );
}

