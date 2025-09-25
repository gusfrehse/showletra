import type { Word } from './game.tsx';

interface WordListProps {
    words: Word[] 
};

const Word = ({word}: {word: Word}) => {
    if (word.found) {
        return <div className="text-gray-600">
            {word.user}: {word.word} 
        </div>;
    }

    return <div className="text-gray-400"> 
        {word.length} caracteres
    </div>
};

const WordList = ({words}: WordListProps) => {
    return <>
            {words.map((word, index) => <Word word={word} key={index} />)}
    </>;
}

export default WordList;
