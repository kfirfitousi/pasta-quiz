import type { QuestionType, GameData, RoundData } from 'types';

import { useState } from 'react';

import { PreGame, Countdown, InGame, PostGame } from '.';

const GameStates = ['pre-game', 'countdown', 'in-game', 'post-game'] as const;
type GameState = typeof GameStates[number];

function QuizGame() {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [gameState, setGameState] = useState<GameState>('pre-game');
    const [gameData, setGameData] = useState<GameData>([]);
    const [finalScore, setFinalScore] = useState(0);

    const initGame = async () => {
        await fetchQuestions();
        setGameData([]);
        setGameState('countdown');
    };

    const fetchQuestions = async () => {
        const pasta = await import('../../data/pasta.json');
        const questions = pasta.shapes
            .sort(() => Math.random() - 0.5)
            .slice(0, 10)
            .map((shape) => ({
                imagePath: shape.imagePath,
                answers: [
                    shape.name,
                    ...pasta.shapes
                        .filter((s) => s.name !== shape.name)
                        .sort(() => Math.random() - 0.5)
                        .slice(0, 3)
                        .map((s) => s.name)
                ].sort(() => Math.random() - 0.5),
                correctAnswer: shape.name
            }));
        setQuestions(questions);
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

    switch (gameState) {
        case 'pre-game':
            return <PreGame initGame={initGame} />;
        case 'countdown':
            return <Countdown startGame={startGame} />;
        case 'in-game':
            return (
                <InGame
                    questions={questions}
                    collectRoundData={collectRoundData}
                    setFinalScore={setFinalScore}
                    endGame={endGame}
                />
            );
        case 'post-game':
            return <PostGame gameData={gameData} finalScore={finalScore} initGame={initGame} />;
    }
}

export default QuizGame;
