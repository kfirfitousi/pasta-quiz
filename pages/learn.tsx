import type { NextPage, GetStaticProps } from 'next';

import { dehydrate } from '@tanstack/react-query';
import { queryClient } from 'lib/react-query';
import { getShapes } from 'features/learn';

import { PageLayout } from '~/Layout';
import { PastaCards } from 'features/learn';

const Learn: NextPage = () => {
    return (
        <PageLayout
            title="Pasta Quiz | Learn"
            description="Put your Pasta knowledge to the test! 
            How many pasta shapes can you recognize?
            Learn about pasta shapes here."
        >
            <PastaCards />
        </PageLayout>
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
