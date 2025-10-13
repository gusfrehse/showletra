import { tailwindBgColorFromUsername } from "@/utils/colors";

interface LetterProps {
    letter: string,
    addLetter: (letter: string) => void,
    className?: string
};

const Letter = ({letter, addLetter, className}: LetterProps) => {
    const bgColor = tailwindBgColorFromUsername(localStorage.getItem('user') || "anon");
    return (
        <button
            className={`flex items-center uppercase font-bold text-white justify-center text-3xl rounded-full ${bgColor} aspect-square ${className || ""}`}
            onClick={() => addLetter(letter)}
        >
            {letter}
        </button>
    );
}

export default Letter;
