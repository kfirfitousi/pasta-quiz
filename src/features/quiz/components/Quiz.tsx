import { useEffect } from 'react';
import { useQuizStore } from '../stores/quizStore';
import shallow from 'zustand/shallow';

import { Intro } from './Intro';
import { Countdown } from './Countdown';
import { Game } from './Game';
import { PostGame } from './PostGame';

export const Quiz = () => {
    const { error, gameState, startGame, reset } = useQuizStore(
        (state) => ({
            error: state.error,
            gameState: state.gameState,
            startGame: state.startGame,
            reset: state.reset
        }),
        shallow
    );

    // reset the quiz store when the component unmounts
    useEffect(() => {
        return () => {
            reset();
        };
    }, [reset]);

    return (
        <section className="h-full flex flex-col justify-center items-center">
            {gameState === 'intro' && <Intro />}

            {gameState === 'countdown' && <Countdown time={3} onComplete={startGame} />}

            {gameState === 'game' && <Game />}

            {gameState === 'post-game' && <PostGame />}

            {error && <p className="text-red-500">Error: {error}</p>}
        </section>
    );
};
