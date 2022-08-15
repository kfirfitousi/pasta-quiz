import type { RoundData, QuestionType } from 'types';

import { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';

type InGameProps = {
    questions: QuestionType[];
    collectRoundData: (roundData: RoundData) => void;
    setFinalScore: (score: number) => void;
    endGame: () => void;
};

const InGame = ({ questions, collectRoundData, setFinalScore, endGame }: InGameProps) => {
    const [questionNumber, setQuestionNumber] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(15);

    const currentQuestion = questions[questionNumber];
    const lastQuestion = questionNumber === questions.length - 1;

    const handleAnswer = (answer: string) => {
        setUserAnswer(answer);

        if (answer === currentQuestion.correctAnswer) {
            const newScore = Math.ceil(score + timer * 10);

            setScore(newScore);

            if (lastQuestion) {
                setFinalScore(newScore);
            }
        }

        collectRoundData({
            correctAnswer: currentQuestion.correctAnswer,
            userAnswer: answer,
            timer
        });

        setTimeout(endRound, 1000);
    };

    const endRound = useCallback(() => {
        if (lastQuestion) {
            endGame();
        } else {
            setUserAnswer('');
            setQuestionNumber((prev) => prev + 1);
            setTimer(15);
        }
    }, [lastQuestion, endGame]);

    // creates interval for timer that decrements it
    // as long as no answer is given by the user
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (userAnswer ? prev : prev - 0.1));
        }, 100);

        return () => clearInterval(interval);
    }, [userAnswer]);

    // ends the round when timer reaches 0
    useEffect(() => {
        if (timer <= 0.1) {
            setUserAnswer('no-answer');

            collectRoundData({
                correctAnswer: '',
                userAnswer: 'no-answer',
                timer: 0
            });

            setTimeout(endRound, 1000);
        }
    }, [timer, collectRoundData, endRound]);

    return (
        <>
            <div className="w-full sm:w-3/4 mx-auto flex justify-between text-center text-yellow-800 text-md">
                <p>{questionNumber + 1}/10</p>
                <p>Score: {score}</p>
            </div>

            <div className="w-full sm:w-3/4 aspect-square mx-auto border border-solid border-yellow-500 rounded-sm relative">
                <Image
                    src={`/${currentQuestion.imagePath}`}
                    layout="fill"
                    alt="mysterious pasta shape"
                />
            </div>

            <ul className="w-full sm:w-3/4 flex flex-row flex-wrap justify-between mx-auto mt-1">
                {currentQuestion.answers.map((answer, index) => (
                    <li className="w-full sm:w-1/2 my-0.5 px-0.5" key={index}>
                        <button
                            className={`
                                    w-full h-11 sm:h-9 rounded select-none text-xl 
                                    ${answer.length > 20 ? 'sm:text-sm' : 'sm:text-lg'}
                                    ${
                                        userAnswer && answer === currentQuestion.correctAnswer
                                            ? 'text-yellow-100 bg-green-500'
                                            : (userAnswer === answer &&
                                                  answer !== currentQuestion.correctAnswer) ||
                                              (userAnswer === 'no-answer' &&
                                                  answer !== currentQuestion.correctAnswer)
                                            ? 'text-yellow-100 bg-red-500'
                                            : 'text-yellow-800 bg-yellow-300 hover:text-yellow-300 hover:bg-yellow-800'
                                    }
                                `}
                            disabled={userAnswer !== ''}
                            onClick={() => handleAnswer(answer)}
                        >
                            {answer}
                        </button>
                    </li>
                ))}
            </ul>

            <div className="w-full sm:w-3/4 px-0.5 h-9 mx-auto mt-0.5">
                <div
                    className="leading-9 text-center text-yellow-900 bg-[url(/images/progress.png)] bg-cover bg-no-repeat h-full"
                    style={{
                        backgroundSize: `${(timer * 100) / 15}% 100%`
                    }}
                >
                    {timer.toFixed(1)}
                </div>
            </div>
        </>
    );
};

export default InGame;
