interface LetterProps {
    letter: string,
    addLetter: (letter: string) => void 
};

const Letter = ({letter, addLetter}: LetterProps) => {
    return (
        <button
            className="flex items-center uppercase font-bold justify-center text-3xl rounded-full bg-yellow-500 h-15 aspect-square"
            onClick={() => addLetter(letter)}
        >
            {letter}
        </button>
    );
}

export default Letter;
