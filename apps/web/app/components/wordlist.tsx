import type { Word } from '@showletra/utils';
import { tailwindTextColorFromUsername } from '@/utils/colors';

interface WordListProps {
    words: Word[] 
};

const Word = ({word}: {word: Word}) => {
    if (word.found) {
        return <div className={`${tailwindTextColorFromUsername(word.user)}`}>
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
