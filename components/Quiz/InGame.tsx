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

    const handleAnswer = (answer: string) => {
        setUserAnswer(answer);

        if (answer === questions[questionNumber].correctAnswer) {
            setScore(Math.ceil(score + timer * 10));
        }

        collectRoundData({
            correctAnswer: questions[questionNumber].correctAnswer,
            userAnswer: answer,
            timer
        });

        setTimeout(() => {
            endRound();
        }, 1000);
    };

    const endRound = useCallback(() => {
        if (questionNumber + 1 < questions.length) {
            setUserAnswer('');
            setQuestionNumber(questionNumber + 1);
            setTimer(15);
        } else {
            endGame();
        }
    }, [questionNumber, questions.length, endGame]);

    useEffect(() => setFinalScore(score), [setFinalScore, score]);

    useEffect(() => {
        if (timer > 0 && !userAnswer) {
            setTimeout(() => {
                if (timer >= 0.1) {
                    setTimer(timer - 0.1);
                } else {
                    setUserAnswer('no-answer');

                    collectRoundData({
                        correctAnswer: '',
                        userAnswer: 'no-answer',
                        timer: 0
                    });

                    setTimeout(() => {
                        endRound();
                    }, 1000);
                }
            }, 100);
        }
    }, [timer, userAnswer, collectRoundData, endRound]);

    return (
        <>
            <div className="w-3/4 md:w-2/3 mx-auto flex justify-between text-center text-yellow-800 text-lg">
                <p>{questionNumber + 1}/10</p>
                <p>Score: {score}</p>
            </div>

            <div className="w-3/4 md:w-2/3 aspect-square mx-auto border border-solid border-yellow-500 rounded-sm relative">
                <Image
                    src={`/${questions[questionNumber].imagePath}`}
                    layout="fill"
                    alt="mysterious pasta shape"
                />
            </div>

            <ul className="flex flex-row flex-wrap justify-between w-3/4 md:w-2/3 mx-auto mt-1">
                {questions[questionNumber].answers.map((answer, index) => (
                    <li className="w-full sm:w-1/2 my-0.5 px-0.5" key={index}>
                        <button
                            className={`
                                    w-full h-9 rounded select-none
                                    ${
                                        userAnswer &&
                                        answer === questions[questionNumber].correctAnswer
                                            ? 'text-yellow-100 bg-green-500'
                                            : (userAnswer === answer &&
                                                  answer !==
                                                      questions[questionNumber].correctAnswer) ||
                                              (userAnswer === 'no-answer' &&
                                                  answer !==
                                                      questions[questionNumber].correctAnswer)
                                            ? 'text-yellow-100 bg-red-500'
                                            : 'text-yellow-800 bg-yellow-300 hover:text-yellow-300 hover:bg-yellow-800'
                                    }
                                    ${answer.length > 20 ? 'text-sm' : 'text-lg'}
                                `}
                            disabled={userAnswer !== ''}
                            onClick={() => handleAnswer(answer)}
                        >
                            {answer}
                        </button>
                    </li>
                ))}
            </ul>

            <div className="w-3/4 md:w-2/3 h-7 mx-auto mt-0.5 px-0.5">
                <div
                    className="text-sm leading-7 text-center text-yellow-900 bg-[url(/images/progress.png)] bg-cover bg-no-repeat h-full"
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
