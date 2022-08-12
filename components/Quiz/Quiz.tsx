import type { QuestionType, GameData, RoundData } from 'types';

import { useState } from 'react';

import { PreGame, Countdown, InGame, PostGame } from '.';
import Container from 'components/Container';
import Head from 'next/head';

const GameStates = ['pre-game', 'countdown', 'in-game', 'post-game'] as const;
type GameState = typeof GameStates[number];

const Quiz = () => {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [gameState, setGameState] = useState<GameState>('pre-game');
    const [gameData, setGameData] = useState<GameData>([]);
    const [finalScore, setFinalScore] = useState(0);
    const [preloads, setPreloads] = useState<string[]>([]);

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
                        .map((s) => s.name)
                        .filter((name) => name !== shape.name)
                        .concat(pasta.wrongAnswers)
                        .sort(() => Math.random() - 0.5)
                        .slice(0, 3)
                ].sort(() => Math.random() - 0.5),
                correctAnswer: shape.name
            }));
        setQuestions(questions);
        setPreloads(questions.map((question) => question.imagePath));
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
        <>
            <Head>
                {preloads.map((imagePath, index) => (
                    <link rel="preload" as="image" href={imagePath} key={index} />
                ))}
            </Head>

            <Container>
                {(() => {
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
                            return (
                                <PostGame
                                    gameData={gameData}
                                    finalScore={finalScore}
                                    initGame={initGame}
                                />
                            );
                    }
                })()}
            </Container>
        </>
    );
};

export default Quiz;
