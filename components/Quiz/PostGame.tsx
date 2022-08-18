import type { GameData } from 'types';

import { useState, useReducer } from 'react';
import { submitReducer, initialSubmitState } from 'lib/submitReducer';
import { server } from 'config';

import Spinner from '~/Spinner';
import Link from 'next/link';

type PostGameProps = {
    gameData: GameData;
    finalScore: number;
    initGame: () => void;
};

type ApiResponse = {
    error: {
        message: string;
    } | null;
};

const PostGame = ({ gameData, finalScore, initGame }: PostGameProps) => {
    const [name, setName] = useState('');

    const [submitStatus, dispatch] = useReducer(submitReducer, initialSubmitState);

    const handleSubmit = async () => {
        if (name === '') {
            dispatch({ type: 'error', message: 'Please enter your name' });
            return;
        }

        dispatch({ type: 'submit' });

        const response = await fetch(`${server}/api/scores`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                gameData
            })
        });

        const { error }: ApiResponse = await response.json();

        if (error) {
            dispatch({ type: 'error', message: error.message });
        } else {
            dispatch({ type: 'success' });
        }
    };

    return (
        <section className="h-full flex flex-col justify-center">
            <h2 className="text-lg text-yellow-800 text-center mb-2">
                You scored {finalScore} points!
            </h2>

            <div className="w-2/3 mx-auto">
                {submitStatus.success ? (
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
                            className="w-36 bg-yellow-200 text-yellow-800 placeholder:text-yellow-800 border border-yellow-300 rounded px-2 py-1 mr-2"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {submitStatus.pending ? (
                            <button className="w-20 bg-yellow-300 text-yellow-800 rounded" disabled>
                                <Spinner size={34} />
                            </button>
                        ) : (
                            <button
                                className="w-20 bg-yellow-300 text-yellow-800 hover:bg-yellow-800 hover:text-yellow-300 rounded"
                                onClick={() => handleSubmit()}
                            >
                                Submit
                            </button>
                        )}
                    </div>
                )}

                {submitStatus.errorMessage ? (
                    <p className="text-center text-yellow-800 mb-4">
                        There was an error submitting your score.
                        <br />
                        Error Message: {submitStatus.errorMessage}
                    </p>
                ) : null}
            </div>

            <div className="w-36 mx-auto mb-20">
                <button
                    className="bg-yellow-300 text-yellow-800 hover:bg-yellow-800 hover:text-yellow-300 rounded w-full h-8 mx-auto"
                    onClick={() => initGame()}
                >
                    Play Again
                </button>
            </div>
        </section>
    );
};

export default PostGame;
