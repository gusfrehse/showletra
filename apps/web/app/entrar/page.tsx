'use client'

import Title from '../components/title';
import Button from '../components/button';
import TextInput from '../components/textinput';
import { useState, useEffect, FormEventHandler } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
    const [name, setName] = useState<string>('');
    const [room, setRoom] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const name = localStorage.getItem('user');
        
        if (name)
            setName(name);

        const room = localStorage.getItem('room');
        
        if (room)
            setRoom(room);
    }, []);

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        localStorage.setItem('user', name);
        localStorage.setItem('room', room);

        router.push("/");
    };

    return ( 
        <>
            <Title />
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <TextInput
                    required
                    placeholder="nome"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <TextInput
                    placeholder="sala"
                    value={room}
                    onChange={e => setRoom(e.target.value)}
                />
                <Button type='submit'>jogar</Button>
            </form>
        </>
    );
}

export default Home;
