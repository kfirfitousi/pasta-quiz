import type { GameData, RoundData } from 'types';

import { useState } from 'react';
import { useQuestions } from 'hooks/getQuestions';

import Intro from './Intro';
import Countdown from './Countdown';
import Game from './Game';
import PostGame from './PostGame';

type GameState = 'pre-game' | 'countdown' | 'in-game' | 'post-game';

const Quiz = () => {
    const [gameState, setGameState] = useState<GameState>('pre-game');
    const [finalScore, setFinalScore] = useState(0);
    const [gameData, setGameData] = useState<GameData>([]);

    const { data, isError, isSuccess, refetch } = useQuestions({
        config: {
            enabled: false // disable automatic refetching
        }
    });

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
            {gameState === 'pre-game' && <Intro initGame={initGame} />}

            {isSuccess && gameState === 'countdown' && <Countdown startGame={startGame} />}

            {isSuccess && gameState === 'in-game' && (
                <Game
                    questions={data}
                    collectRoundData={collectRoundData}
                    setFinalScore={setFinalScore}
                    endGame={endGame}
                />
            )}

            {gameState === 'post-game' && (
                <PostGame gameData={gameData} finalScore={finalScore} initGame={initGame} />
            )}

            {isError && (
                <div className="text-center text-yellow-800">
                    <p>Error occured while getting questions.</p>
                    <p>Try refreshing the page.</p>
                </div>
            )}
        </section>
    );
};

export default Quiz;
