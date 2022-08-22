import type { GameData, RoundData } from 'types';

import { useState } from 'react';
import { useQuestions } from 'hooks/getQuestions';

import PreGame from './PreGame';
import Countdown from './Countdown';
import InGame from './InGame';
import PostGame from './PostGame';

type GameState = 'pre-game' | 'countdown' | 'in-game' | 'post-game';

const Quiz = () => {
    const [gameState, setGameState] = useState<GameState>('pre-game');
    const [finalScore, setFinalScore] = useState(0);
    const [gameData, setGameData] = useState<GameData>([]);

    const { data, isError, isSuccess, refetch } = useQuestions();

    /** fetches new questions, resets collected game data and begins countdown */
    const initGame = async () => {
        await refetch(); // get new questions
        setGameData([]);
        setGameState('countdown');
    };

    /** collects game data which will be sent as evidence when submitting score */
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
