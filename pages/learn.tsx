import type { NextPage, GetStaticProps } from 'next';

import { dehydrate } from '@tanstack/react-query';
import { queryClient } from 'lib/react-query';
import { getShapes } from 'hooks/getShapes';

import Layout from '~/Layout';
import PastaCards from '~/PastaCards';

const Learn: NextPage = () => {
    return (
        <Layout
            title="Pasta Quiz | Learn"
            description="Put your Pasta knowledge to the test! 
            How many pasta shapes can you recognize?
            Learn about pasta shapes here."
        >
            <PastaCards />
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    await queryClient.prefetchQuery(['shapes'], () => getShapes(), {
        staleTime: 100000
    });

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    };
};

export default Learn;
