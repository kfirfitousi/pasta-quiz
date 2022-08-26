import { useState } from 'react';
import { useLeaderboard } from 'hooks/getLeaderboard';

import Spinner from '~/Spinner';

const ScoreTable = () => {
    const [limit, setLimit] = useState(10);
    const { data, isFetching, isError, isLoading, isPreviousData } = useLeaderboard({
        limit,
        config: { keepPreviousData: true }
    });

    if (isLoading) {
        return <div className="text-center text-yellow-800 mt-5">Loading...</div>;
    }

    if (isError) {
        return (
            <div className="text-center text-yellow-800 mt-5">
                <p>Error occured while fetching leaderboard.</p>
                <p>Try refreshing the page.</p>
            </div>
        );
    }

    return (
        <section className="flex flex-col items-center mt-5 text-yellow-800">
            <div className="flex flex-row text-center h-6 md:h-8">
                <div className="w-6 md:w-10"></div>
                <div className="w-52 md:w-80 md:text-lg">Name</div>
                <div className="w-20 md:text-lg">Score</div>
            </div>

            <div className="flex flex-col space-y-1.5">
                {data.scores.map(({ name, score }, index) => (
                    <div
                        key={index}
                        className="flex flex-row text-center h-8 md:h-10 bg-yellow-200 rounded shadow-sm"
                    >
                        <div className="w-6 md:w-10 text-sm leading-8 md:leading-10 md:text-lg text-yellow-500">
                            {index + 1}
                        </div>
                        <div className="w-52 md:w-80 md:text-xl leading-8 md:leading-10 select-all">
                            {name}
                        </div>
                        <div className="w-20 md:text-xl leading-8 md:leading-10 bg-yellow-300 rounded-r select-all">
                            {score}
                        </div>
                    </div>
                ))}
            </div>

            <button
                className="h-9 px-3 mt-3 shadow-md rounded bg-yellow-300 text-yellow-800 hover:bg-yellow-800 hover:text-yellow-300 disabled:text-zinc-700 disabled:bg-zinc-200"
                disabled={isPreviousData || !data?.hasMore}
                onClick={() => {
                    if (!isPreviousData && data.hasMore) {
                        setLimit((prev) => prev + 10);
                    }
                }}
            >
                {isFetching ? <Spinner size="sm" /> : 'Show More'}
            </button>
        </section>
    );
};

export default ScoreTable;
