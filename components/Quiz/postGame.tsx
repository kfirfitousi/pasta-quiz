import { NextPage } from 'next';
import { useState } from 'react';
import { server } from 'config';

import Container from 'components/Container';
import Link from 'next/link';

import type { GameData } from 'types';

type Props = {
    score: number;
    restartQuiz: () => void;
    gameData: GameData;
};

const PostGame: NextPage<Props> = ({ score, restartQuiz, gameData }: Props) => {
    const [name, setName] = useState('');
    const [submitPending, setSubmitPending] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    const uploadScore = async () => {
        setSubmitPending(true);
        const res = await fetch(`${server}/api/scores`, {
            method: 'POST',
            body: JSON.stringify({
                name,
                gameData
            })
        });
        res.status === 200 ? setSubmitSuccess(true) : setSubmitError(true);
        setSubmitPending(false);
    };

    return (
        <Container>
            <h2 className="text-lg text-yellow-800 text-center mt-32 mb-2">
                You scored {score} points!
            </h2>
            <div className="w-2/3 mx-auto">
                {!submitSuccess && (
                    <div className="flex flex-row w-fit mx-auto mb-4">
                        <input
                            type="text"
                            className="w-36 bg-yellow-200 text-yellow-800 placeholder:text-yellow-800 border border-yellow-300 rounded px-2 py-1 mr-2"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button
                            className="w-20 bg-yellow-300 text-yellow-800 hover:bg-yellow-800 hover:text-yellow-300 rounded"
                            onClick={() => uploadScore()}
                            disabled={submitPending}
                        >
                            {submitPending ? '...' : 'Submit'}
                        </button>
                    </div>
                )}
                {submitSuccess && (
                    <p className="text-center text-yellow-800 mb-4">
                        Your score has been submitted to the&nbsp;
                        <Link href="/leaderboard">
                            <span className="underline text-bold cursor-pointer">leaderboard</span>
                        </Link>
                        !
                    </p>
                )}
                {submitError && (
                    <p className="text-center text-yellow-800 mb-4">
                        There was an error submitting your score.
                        <br />
                        Please try again later.
                    </p>
                )}
            </div>
            <div className="w-36 mx-auto">
                <button
                    className="bg-yellow-300 text-yellow-800 hover:bg-yellow-800 hover:text-yellow-300 rounded w-full h-8 mx-auto"
                    onClick={() => restartQuiz()}
                >
                    Play Again
                </button>
            </div>
        </Container>
    );
};

export default PostGame;
