import Letter from './letter';

interface KeyboardProps {
    availableLetters: string,
    mandatoryLetter: string,
    addLetter: (letter: string) => void,
    horizontal: boolean
};

export default function Keyboard({ availableLetters, mandatoryLetter, addLetter, horizontal }: KeyboardProps) {
    if (horizontal)
        return (
            <div className={"flex w-full max-w-[500px] " + (horizontal ? "flex-row gap-2" : "flex-col")}>
                <Letter className={"w-full border-2"} letter={mandatoryLetter} addLetter={addLetter} />
                <Letter className={"w-full border-2 border-dashed"} letter={availableLetters[1]} addLetter={addLetter} />
                <Letter className={"w-full border-2 border-dashed"} letter={availableLetters[2]} addLetter={addLetter} />
                <Letter className={"w-full border-2 border-dashed"} letter={availableLetters[3]} addLetter={addLetter} />
                <Letter className={"w-full border-2 border-dashed"} letter={availableLetters[4]} addLetter={addLetter} />
                <Letter className={"w-full border-2 border-dashed"} letter={availableLetters[5]} addLetter={addLetter} />
                <Letter className={"w-full border-2 border-dashed"} letter={availableLetters[6]} addLetter={addLetter} />
            </div>
        );

    return (
        <div className="flex flex-col w-full max-w-[500px] ">
            <div className="flex gap-2 justify-center">
                <Letter className={"h-15 border-2 border-dashed"} letter={availableLetters[1]} addLetter={addLetter} />
                <Letter className={"h-15 border-2 border-dashed"} letter={availableLetters[2]} addLetter={addLetter} />
            </div>
            <div className="flex gap-2 justify-center">
                <Letter className={"h-15 border-2 border-dashed"} letter={availableLetters[3]} addLetter={addLetter} />
                <Letter className={"h-15 border-2"} letter={mandatoryLetter} addLetter={addLetter} />
                <Letter className={"h-15 border-2 border-dashed"} letter={availableLetters[4]} addLetter={addLetter} />
            </div>
            <div className="flex gap-2 justify-center">
                <Letter className={"h-15 border-2 border-dashed"} letter={availableLetters[5]} addLetter={addLetter} />
                <Letter className={"h-15 border-2 border-dashed"} letter={availableLetters[6]} addLetter={addLetter} />
            </div>
        </div>
    );
}

