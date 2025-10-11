'use client'
import { useEffect, useState, ReactNode } from 'react';

interface TitleProps {
    children?: ReactNode
};

const Title = (props: TitleProps) => {
    const [identifier, setIdentifier] = useState<string>("anon@main");

    useEffect(() => {
        const user = localStorage.getItem('user') || 'anon';
        const room = localStorage.getItem('room') || 'main';
        setIdentifier(`${user}@${room}`);
    }, []);

    return (
        <div className="w-full flex flex-row justify-between items-baseline gap-2 p-3">
            <div className="text-4xl font-bold italic uppercase">
                {props.children ?? "showletra"}
            </div>
            <div>
                <a className="underline" href="/entrar">{identifier}</a>
            </div>
        </div>
    );
}

export default Title;
