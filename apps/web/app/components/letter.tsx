import { tailwindBgColorFromUsername } from "@/utils/colors";

interface LetterProps {
    letter: string,
    addLetter: (letter: string) => void 
};

const Letter = ({letter, addLetter}: LetterProps) => {
    const bgColor = tailwindBgColorFromUsername(localStorage.getItem('user') || "anon");
    return (
        <button
            className={`flex items-center uppercase font-bold justify-center text-3xl rounded-full ${bgColor} h-15 aspect-square`}
            onClick={() => addLetter(letter)}
        >
            {letter}
        </button>
    );
}

export default Letter;
