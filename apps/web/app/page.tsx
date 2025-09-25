import Game from "./components/game";
import Title from "./components/title"

const Home = async () => {
    const res = await fetch("http://" + process.env.NEXT_PUBLIC_SERVER_URL + "/jogo");
    const info = await res.json();

    return ( 
        <>
            <Title />
            <Game info={info} />
        </>
    );
}

export default Home;
