import { useQuizStore } from '../stores/quizStore';
import shallow from 'zustand/shallow';

import Image from 'next/image';
import clsx from 'clsx';

export const Game = () => {
    const { questions, roundNumber, userAnswer, score, timer, handleAnswer, nextRound } =
        useQuizStore(
            (state) => ({
                questions: state.questions,
                roundNumber: state.roundNumber,
                userAnswer: state.userAnswer,
                score: state.score,
                timer: state.timer,
                handleAnswer: state.handleAnswer,
                nextRound: state.nextRound
            }),
            shallow
        );

    const { correctAnswer, answers } = questions[roundNumber - 1];

    const handleAnswerClick = (answer: string) => {
        handleAnswer(answer, timer);
        setTimeout(nextRound, 1000);
    };

    return (
        <>
            <div className="w-64 sm:w-3/4 flex justify-between text-center text-yellow-800">
                <p>{roundNumber}/10</p>
                <p>Score: {score}</p>
            </div>

            <div className="relative w-64 sm:w-3/4 rounded shadow-sm aspect-square border border-yellow-300">
                {questions.map((question, index) => (
                    <Image
                        src={question.imagePath}
                        className={clsx('w-20 rounded', index !== roundNumber - 1 && 'invisible')}
                        layout="fill"
                        alt="mysterious pasta shape"
                        key={index}
                    />
                ))}
            </div>

            <ul className="w-64 sm:w-3/4 flex flex-row flex-wrap justify-between mt-1">
                {answers.map((answer, index) => (
                    <li className="w-full sm:w-1/2 p-0.5 sm:p-1" key={`${index}${roundNumber}`}>
                        <button
                            className={clsx(
                                'w-full h-11 sm:h-16 rounded select-none text-xl shadow-sm',
                                answer.length > 20 ? 'text-base sm:text-sm' : 'text-xl',
                                userAnswer &&
                                    answer === correctAnswer &&
                                    'text-yellow-100 bg-green-500',

                                (userAnswer === answer || userAnswer === 'no-answer') &&
                                    answer !== correctAnswer &&
                                    'text-yellow-100 bg-red-500',

                                (!userAnswer || userAnswer !== answer) &&
                                    'text-yellow-800 bg-yellow-300',

                                !userAnswer &&
                                    'hover:shadow-lg hover:text-yellow-300 hover:bg-yellow-800'
                            )}
                            disabled={!!userAnswer}
                            onClick={() => handleAnswerClick(answer)}
                        >
                            {answer}
                        </button>
                    </li>
                ))}
            </ul>

            <div className="w-64 sm:w-3/4 px-0.5 h-11 mx-auto mt-1 mb-20">
                <div
                    className="h-full leading-[2.75rem] text-center text-yellow-900 bg-[url(/images/progress.png)] bg-cover bg-no-repeat"
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
