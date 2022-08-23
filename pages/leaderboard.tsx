import type { NextPage, GetStaticProps } from 'next';

import { dehydrate } from '@tanstack/react-query';
import { queryClient } from 'lib/react-query';
import { getLeaderboard } from 'hooks/getLeaderboard';

import Layout from '~/Layout';
import ScoreTable from '~/ScoreTable';

const Leaderboard: NextPage = () => {
    return (
        <Layout
            title="Pasta Quiz | Leaderboard"
            description="Put your Pasta knowledge to the test! 
            How many pasta shapes can you recognize?
            Check the leaderboard to see the current high scores."
        >
            <ScoreTable />
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    await queryClient.prefetchQuery(['leaderboard', 10], () => getLeaderboard(10), {
        staleTime: 10000
    });

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    };
};

export default Leaderboard;
