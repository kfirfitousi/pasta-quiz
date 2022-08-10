import type { NextPage } from 'next';

import Container from 'components/Container';

type PreGameProps = {
    initGame: () => void;
};

const PreGame: NextPage<PreGameProps> = ({ initGame }: PreGameProps) => {
    return (
        <Container>
            <p className="text-xl text-center text-yellow-800 mt-44 md:mt-52">
                Put your pasta knowledge to the test!
            </p>
            <p className="md:w-2/3 mx-auto text-center text-yellow-800 mb-2">
                There are 10 rounds, in each one you must name the pasta shape within 15 seconds.
            </p>

            <div className="w-36 mx-auto">
                <button
                    className="bg-yellow-300 text-yellow-800 hover:bg-yellow-800 hover:text-yellow-300 rounded w-full h-8 mx-auto"
                    onClick={() => initGame()}
                >
                    Play
                </button>
            </div>
        </Container>
    );
};

export default PreGame;
