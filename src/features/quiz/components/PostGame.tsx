import { useState } from 'react';
import { useQuestions } from '../api/getQuestions';
import { useSubmitScore } from '../api/submitScore';
import { useQuizStore } from '../stores/quizStore';
import shallow from 'zustand/shallow';
import { z } from 'zod';

import { Spinner } from '~/Spinner';
import Link from 'next/link';

export const ScoreSubmitSchema = z.object({
    name: z.string().min(1, 'Please enter your name'),
    roundResults: z
        .array(
            z.object({
                isCorrect: z.boolean(),
                timer: z.number().min(0).max(15)
            }),
            {
                invalid_type_error: 'Malformed game data',
                required_error: 'Missing game data'
            }
        )
        .length(10, 'Malformed game data')
});

export const PostGame = () => {
    const [name, setName] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const { score, roundResults, initGame } = useQuizStore(
        (state) => ({
            score: state.score,
            roundResults: state.roundResults,
            initGame: state.initGame
        }),
        shallow
    );

    const { isFetching, refetch } = useQuestions({
        config: {
            enabled: false // disable automatic refetching
        }
    });

    const scoreMutation = useSubmitScore({
        config: {
            onError: (error) => {
                setErrors([error.message]);
            }
        }
    });

    const handleSubmit = () => {
        setErrors([]);

        const validation = ScoreSubmitSchema.safeParse({
            name,
            roundResults
        });

        if (!validation.success) {
            setErrors(validation.error.issues.map((issue) => issue.message));
            return;
        }

        scoreMutation.mutate(validation.data);
    };

    const handlePlayAgain = async () => {
        const questionsQuery = await refetch();
        initGame(questionsQuery.data);
    };

    return (
        <>
            <p className="text-lg text-yellow-800 text-center mb-2">You scored {score} points.</p>

            <div className="w-2/3 mx-auto">
                {scoreMutation.isSuccess ? (
                    <p className="text-center text-yellow-800 mb-4">
                        {scoreMutation.data.position
                            ? `
                                You positioned 
                                ${((n: number) => {
                                    // convert number to ordinal
                                    let s = ['th', 'st', 'nd', 'rd'];
                                    let v = n % 100;
                                    return n + (s[(v - 20) % 10] || s[v] || s[0]);
                                })(scoreMutation.data.position)}
                                in the `
                            : `Your score has been submitted to the `}
                        <Link href="/leaderboard">
                            <span className="underline text-bold cursor-pointer hover:text-yellow-600">
                                Leaderboard
                            </span>
                        </Link>
                        !
                    </p>
                ) : (
                    <div className="flex flex-row w-fit mx-auto mb-4">
                        <input
                            type="text"
                            className="w-36 rounded px-2 py-1 mr-2 shadow-sm focus:shadow-lg bg-yellow-200 text-yellow-800 placeholder:text-yellow-800 border border-yellow-300"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        {scoreMutation.isLoading ? (
                            <div className="w-20 rounded shadow-sm bg-yellow-300 text-yellow-800">
                                <Spinner size="sm" />
                            </div>
                        ) : (
                            <button
                                className="w-20 rounded shadow-sm bg-yellow-300 text-yellow-800 hover:bg-yellow-800 hover:text-yellow-300"
                                onClick={() => handleSubmit()}
                            >
                                Submit
                            </button>
                        )}
                    </div>
                )}

                {errors.length > 0 && (
                    <div className="text-center text-yellow-800 mb-4">
                        <p>There was an error submitting your score.</p>
                        Error Message(s):
                        {errors.map((error, index) => (
                            <p key={index}>- {error}</p>
                        ))}
                    </div>
                )}
            </div>

            <div className="w-36 mx-auto mb-20">
                <button
                    className="w-full h-8 mx-auto rounded shadow-sm bg-yellow-300 text-yellow-800 hover:bg-yellow-800 hover:text-yellow-300"
                    disabled={isFetching}
                    onClick={handlePlayAgain}
                >
                    {isFetching ? <Spinner size="sm" /> : 'Play Again'}
                </button>
            </div>
        </>
    );
};
