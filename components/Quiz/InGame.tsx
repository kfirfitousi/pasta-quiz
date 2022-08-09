import type { NextPage } from 'next';
import type { RoundData, QuestionType } from 'types';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Container from 'components/Container';

type Props = {
    questions: QuestionType[];
    collectRoundData: (roundData: RoundData) => void;
    setFinalScore: (score: number) => void;
    endGame: () => void;
};

const InGame: NextPage<Props> = ({
    questions,
    collectRoundData,
    setFinalScore,
    endGame
}: Props) => {
    const [questionNumber, setQuestionNumber] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(15);
    const [imgLoading, setImgLoading] = useState(true);

    const handleAnswer = (answer: string) => {
        setUserAnswer(answer);
        if (answer === questions[questionNumber].correctAnswer) {
            setScore(Math.ceil(score + timer * 10));
        }

        collectRoundData({
            question: questions[questionNumber],
            userAnswer: answer,
            timer
        });

        setTimeout(() => {
            questionNumber + 1 < questions.length ? nextQuestion() : endGame();
        }, 1000);
    };

    const nextQuestion = () => {
        setUserAnswer('');
        setQuestionNumber(questionNumber + 1);
        setTimer(15);
    };

    useEffect(() => {
        return () => setFinalScore(score);
    });

    useEffect(() => {
        let timerId: NodeJS.Timer;

        if (!userAnswer && !imgLoading) {
            timerId = setInterval(() => {
                setTimer(timer - 0.1);
                if (timer < 0.1) {
                    clearInterval(timerId);
                    setTimer(0);
                    handleAnswer('no-answer');
                    setTimeout(() => {
                        questionNumber + 1 < questions.length ? nextQuestion() : endGame();
                    }, 1000);
                }
            }, 100);
        }

        return () => clearInterval(timerId);
    });

    return (
        <Container>
            <div className="w-3/4 md:w-2/3 mx-auto flex justify-between text-center text-yellow-800 text-lg">
                <p>{questionNumber + 1}/10</p>
                <p>Score: {score}</p>
            </div>

            <div className="w-3/4 md:w-2/3 aspect-square mx-auto border border-solid border-yellow-500 rounded-sm relative">
                <Image
                    src={`/${questions[questionNumber].imagePath}`}
                    layout="fill"
                    alt="mysterious pasta shape"
                    onLoadStart={() => setImgLoading(true)}
                    onLoadingComplete={() => setImgLoading(false)}
                    priority
                />
            </div>

            <ul className="flex flex-row flex-wrap justify-between w-3/4 md:w-2/3 mx-auto mt-1">
                {questions[questionNumber].answers.map((answer) => (
                    <li className="w-full sm:w-1/2 my-0.5 px-0.5" key={answer}>
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
        </Container>
    );
};

export default InGame;
