import type { RoundData, Question } from 'types';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

type InGameProps = {
    questions: Question[];
    collectRoundData: (roundData: RoundData) => void;
    setFinalScore: (score: number) => void;
    endGame: () => void;
};

const InGame = ({ questions, collectRoundData, setFinalScore, endGame }: InGameProps) => {
    const [questionNumber, setQuestionNumber] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(15);

    const isTimerActive = useRef(true);

    const { correctAnswer, answers } = questions[questionNumber];
    const isLastQuestion = questionNumber === questions.length - 1;

    const handleAnswer = (answer: string) => {
        setUserAnswer(answer);
        isTimerActive.current = false;

        let newScore = score;

        if (answer === correctAnswer) {
            newScore = Math.ceil(score + timer * 10);
            setScore(newScore);
        }

        if (isLastQuestion) {
            setFinalScore(newScore);
        }

        collectRoundData({
            correctAnswer,
            answer,
            timer
        });

        setTimeout(endRound, 1000);
    };

    const endRound = () => {
        if (isLastQuestion) {
            endGame();
        } else {
            setUserAnswer('');
            setQuestionNumber((prev) => prev + 1);
            setTimer(15);
            isTimerActive.current = true;
        }
    };

    // creates interval that decrememnts timer every 0.1 seconds
    // as long as isTimerActive is true
    useEffect(() => {
        const interval = setInterval(() => {
            if (isTimerActive.current) {
                setTimer((prev) => prev - 0.1);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    // ends the round when timer reaches 0
    useEffect(() => {
        if (timer < 0.1) {
            setUserAnswer('no-answer');
            isTimerActive.current = false;

            collectRoundData({
                correctAnswer: '',
                answer: 'no-answer',
                timer: 0
            });

            setTimeout(endRound, 1000);
        }
        // eslint-disable-next-line
    }, [timer]);

    return (
        <>
            <div className="w-64 sm:w-3/4 flex justify-between text-center text-yellow-800 text-md">
                <p>{questionNumber + 1}/10</p>
                <p>Score: {score}</p>
            </div>

            <div className="relative w-64 sm:w-3/4 rounded shadow-sm aspect-square border border-solid border-yellow-500">
                {questions.map((question, index) => (
                    <Image
                        src={question.imagePath}
                        className={`w-20 rounded ${
                            index === questionNumber ? 'visible' : 'invisible'
                        }`}
                        layout="fill"
                        alt="mysterious pasta shape"
                        key={index}
                    />
                ))}
            </div>

            <ul className="w-64 sm:w-3/4 flex flex-row flex-wrap justify-between mt-1">
                {answers.map((answer, index) => (
                    <li className="w-full sm:w-1/2 my-0.5 px-0.5" key={`${index}${questionNumber}`}>
                        <button
                            className={`
                                    w-full h-11 sm:h-9 rounded select-none text-xl shadow-sm hover:shadow-lg
                                    ${answer.length > 20 ? 'sm:text-sm' : 'sm:text-lg'}
                                    ${
                                        userAnswer && answer === correctAnswer
                                            ? 'text-yellow-100 bg-green-500'
                                            : (userAnswer === answer && answer !== correctAnswer) ||
                                              (userAnswer === 'no-answer' &&
                                                  answer !== correctAnswer)
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

            <div className="w-64 sm:w-3/4 px-0.5 h-9 mx-auto mt-0.5">
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
