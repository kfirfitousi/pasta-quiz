import type { NextPage, GetStaticProps } from 'next';

import { dehydrate } from '@tanstack/react-query';
import { queryClient } from 'lib/react-query';
import { getLeaderboard } from 'features/leaderboard';

import { PageLayout } from '~/Layout';
import { ScoreTable } from 'features/leaderboard';

const Leaderboard: NextPage = () => {
    return (
        <PageLayout
            title="Pasta Quiz | Leaderboard"
            description="Put your Pasta knowledge to the test! 
            How many pasta shapes can you recognize?
            Check the leaderboard to see the current high scores."
        >
            <ScoreTable />
        </PageLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    await queryClient.prefetchQuery(['leaderboard', 10], () => getLeaderboard(10), {
        staleTime: 60 * 1000
    });

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    };
};

export default Leaderboard;
