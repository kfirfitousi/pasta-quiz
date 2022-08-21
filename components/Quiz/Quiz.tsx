import type { QuestionType, GameData, RoundData } from 'types';

import { useState } from 'react';

import PreGame from './PreGame';
import Countdown from './Countdown';
import InGame from './InGame';
import PostGame from './PostGame';

type GameState = 'pre-game' | 'countdown' | 'in-game' | 'post-game';

type ApiResponse = {
    questions: QuestionType[];
};

const Quiz = () => {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [gameState, setGameState] = useState<GameState>('pre-game');
    const [gameData, setGameData] = useState<GameData>([]);
    const [finalScore, setFinalScore] = useState(0);

    const initGame = async () => {
        const response = await fetch(`/api/questions`);
        const data: ApiResponse = await response.json();
        setQuestions(data.questions);
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
};

export default Quiz;
