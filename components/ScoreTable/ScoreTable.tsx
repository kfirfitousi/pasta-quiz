import { useState } from 'react';
import { useLeaderboard } from 'hooks/getLeaderboard';

import Spinner from '~/Spinner';

const ScoreTable = () => {
    const [limit, setLimit] = useState(10);
    const { data, isLoading, isError } = useLeaderboard({ limit });

    if (isLoading) {
        return (
            <div className="text-center text-yellow-800 mt-5">
                <Spinner size="md" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center text-yellow-800 mt-5">
                Error occured while fetching leaderboard.
            </div>
        );
    }

    return (
        <section className="flex flex-col items-center mt-5 text-yellow-800">
            <div className="flex flex-row text-center md:h-8">
                <p className="w-52 md:w-80 md:leading-8 md:text-lg">Name</p>
                <p className="w-20 md:leading-8 md:text-lg">Score</p>
            </div>

            {data?.map(({ name, score }, index) => (
                <div key={index} className="flex flex-row text-center md:h-8">
                    <p className="w-5 md:w-10 md:leading-8 md:text-lg text-yellow-500 bg-yellow-200 ">
                        {index + 1}
                    </p>
                    <p className="w-52 md:w-80 md:leading-8 md:text-lg bg-yellow-200 border-b border-solid border-yellow-300 select-all">
                        {name}
                    </p>
                    <p className="w-20 md:leading-8 md:text-lg bg-yellow-300 border-b border-solid border-yellow-400 select-all">
                        {score}
                    </p>
                </div>
            ))}

            {limit <= 40 && (
                <button
                    className="bg-yellow-300 text-yellow-800 hover:bg-yellow-800 hover:text-yellow-300 rounded h-9 px-2 mt-4 mx-auto"
                    onClick={() => setLimit(limit + 10)}
                >
                    Show More
                </button>
            )}
        </section>
    );
};

export default ScoreTable;
