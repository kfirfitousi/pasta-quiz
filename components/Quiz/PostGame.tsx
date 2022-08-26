import type { GameData } from 'types';

import { useSubmitScore } from 'hooks/submitScore';
import { useState } from 'react';
import { z } from 'zod';

import Spinner from '~/Spinner';
import Link from 'next/link';

export const SubmitSchema = z.object({
    name: z.string().min(1, 'Please enter your name'),
    gameData: z
        .array(
            z.object({
                correctAnswer: z.string(),
                answer: z.string(),
                timer: z.number().min(0).max(15)
            }),
            {
                invalid_type_error: 'Malformed game data',
                required_error: 'Missing game data'
            }
        )
        .length(10, 'Malformed game data')
});

type PostGameProps = {
    gameData: GameData;
    finalScore: number;
    initGame: () => void;
};

const PostGame = ({ gameData, finalScore, initGame }: PostGameProps) => {
    const [name, setName] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const scoreMutation = useSubmitScore({
        config: {
            onError: (error) => {
                setErrors([error.message]);
            }
        }
    });

    const handleSubmit = () => {
        setErrors([]);

        const validation = SubmitSchema.safeParse({
            name,
            gameData
        });

        if (!validation.success) {
            setErrors(validation.error.issues.map((issue) => issue.message));
            return;
        }

        scoreMutation.mutate(validation.data);
    };

    return (
        <>
            <h2 className="text-lg text-yellow-800 text-center mb-2">
                You scored {finalScore} points!
            </h2>

            <div className="w-2/3 mx-auto">
                {scoreMutation.isSuccess ? (
                    <p className="text-center text-yellow-800 mb-4">
                        Your score has been submitted to the&nbsp;
                        <Link href="/leaderboard">
                            <span className="underline text-bold cursor-pointer">leaderboard</span>
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

                {errors.length && (
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
                    onClick={() => initGame()}
                >
                    Play Again
                </button>
            </div>
        </>
    );
};

export default PostGame;
