import { ReactNode } from 'react';

interface TitleProps {
    children?: ReactNode
};

const Title = (props: TitleProps) => {
    return (<p className="text-4xl p-4 font-bold text-center">{props.children ?? "showletra"}</p>)
}

export default Title;
