import { useQuestions } from '../api/getQuestions';
import { useQuizStore } from '../stores/quizStore';

import { Spinner } from '~/Spinner';

export const Intro = () => {
    const { isFetching, refetch } = useQuestions({
        config: {
            enabled: false // disable automatic refetching
        }
    });

    const { initGame } = useQuizStore();

    const handleClick = async () => {
        const questionsQuery = await refetch();
        initGame(questionsQuery.data);
    };

    return (
        <>
            <p className="text-xl text-center text-yellow-800">
                Put your pasta knowledge to the test!
            </p>
            <p className="md:w-2/3 mx-auto  mb-3 text-center text-yellow-800">
                There are 10 rounds, in each one you must name the pasta shape within 15 seconds.
            </p>

            <div className="w-32 mx-auto mb-20">
                <button
                    className="w-full h-9 mx-auto rounded shadow-md bg-yellow-300 text-yellow-800 hover:bg-yellow-800 hover:text-yellow-300"
                    disabled={isFetching}
                    onClick={handleClick}
                >
                    {isFetching ? <Spinner size="sm" /> : 'Play'}
                </button>
            </div>
        </>
    );
};
