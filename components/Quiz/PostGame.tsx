import type { GameData } from 'types';

import { useState } from 'react';
import { server } from 'config';

import Spinner from 'components/Spinner';
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
    const [submitPending, setSubmitPending] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const submitScore = async () => {
        if (name === '') {
            setErrorMessage('Please enter your name');
            return;
        }

        setSubmitPending(true);

        const res = await fetch(`${server}/api/scores`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                gameData
            })
        });

        const { error }: ApiResponse = await res.json();

        if (error) {
            setErrorMessage(error.message);
        } else {
            setSubmitSuccess(true);
            setErrorMessage('');
        }

        setSubmitPending(false);
    };

    return (
        <>
            <h2 className="text-lg text-yellow-800 text-center mt-32 mb-2">
                You scored {finalScore} points!
            </h2>

            <div className="w-2/3 mx-auto">
                {submitSuccess ? (
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
                        {submitPending ? (
                            <button className="w-20 bg-yellow-300 text-yellow-800 rounded" disabled>
                                <Spinner size={34} />
                            </button>
                        ) : (
                            <button
                                className="w-20 bg-yellow-300 text-yellow-800 hover:bg-yellow-800 hover:text-yellow-300 rounded"
                                onClick={() => submitScore()}
                            >
                                Submit
                            </button>
                        )}
                    </div>
                )}

                {errorMessage ? (
                    <p className="text-center text-yellow-800 mb-4">
                        There was an error submitting your score.
                        <br />
                        Error Message: {errorMessage}
                    </p>
                ) : null}
            </div>

            <div className="w-36 mx-auto">
                <button
                    className="bg-yellow-300 text-yellow-800 hover:bg-yellow-800 hover:text-yellow-300 rounded w-full h-8 mx-auto"
                    onClick={() => initGame()}
                >
                    Play Again
                </button>
            </div>
        </>
    );
};

export default PostGame;
