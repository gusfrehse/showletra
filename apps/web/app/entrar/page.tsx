'use client'

import Title from '../components/title';
import Button from '../components/button';
import TextInput from '../components/textinput';
import { useState, FormEventHandler } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
    const [name, setName] = useState<string>('');
    const router = useRouter();

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        localStorage.setItem('user', name);

        router.push("/");
    };

    return ( 
        <>
            <Title />
            <form onSubmit={handleSubmit}>
                <TextInput
                    placeholder="nome"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <Button type='submit'>jogar</Button>
            </form>
        </>
    );
}

export default Home;
