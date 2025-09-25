import Game from "./components/game";
import Title from "./components/title"
import type { Test } from 'utils';

const Home = async () => {
    const res = await fetch("http://" + process.env.NEXT_PUBLIC_SERVER_URL + "/jogo");
    const info = await res.json();

    const t: Test = {
        test: "ola",
        opa: "ALOU",
    };

    console.log(t, typeof t);

    return ( 
        <>
            <Title />
            <Game info={info} />
        </>
    );
}

export default Home;
