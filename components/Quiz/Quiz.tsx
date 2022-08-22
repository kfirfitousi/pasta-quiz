import type { GameData, RoundData } from 'types';

import { useState } from 'react';

import PreGame from './PreGame';
import Countdown from './Countdown';
import InGame from './InGame';
import PostGame from './PostGame';
import { useQuestions } from 'hooks/getQuestions';

type GameState = 'pre-game' | 'countdown' | 'in-game' | 'post-game';

const Quiz = () => {
    const [gameState, setGameState] = useState<GameState>('pre-game');
    const [gameData, setGameData] = useState<GameData>([]);
    const [finalScore, setFinalScore] = useState(0);

    const { data, isError, isSuccess, refetch } = useQuestions();

    const initGame = async () => {
        await refetch();
        setGameData([]);
        setGameState('countdown');
    };

    const collectRoundData = (roundData: RoundData) => {
        setGameData([...gameData, roundData]);
    };

    const startGame = () => {
        setGameState('in-game');
    };

    const endGame = () => {
        setGameState('post-game');
    };

    return (
        <section className="h-full flex flex-col justify-center items-center">
            {gameState === 'pre-game' && <PreGame initGame={initGame} />}

            {isSuccess && gameState === 'countdown' && <Countdown startGame={startGame} />}

            {gameState === 'in-game' && (
                <InGame
                    questions={data!}
                    collectRoundData={collectRoundData}
                    setFinalScore={setFinalScore}
                    endGame={endGame}
                />
            )}

            {gameState === 'post-game' && (
                <PostGame gameData={gameData} finalScore={finalScore} initGame={initGame} />
            )}

            {isError && (
                <div className="text-yellow-800">Error occured while getting questions.</div>
            )}
        </section>
    );
};

export default Quiz;
