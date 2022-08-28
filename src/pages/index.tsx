import type { NextPage } from 'next';

import { PageLayout } from '~/Layout';
import { Quiz } from '@/features/quiz';

const Home: NextPage = () => {
    return (
        <PageLayout
            title="Pasta Quiz"
            description="Put your Pasta knowledge to the test! 
            How many pasta shapes can you recognize?
            Take the quiz or learn more about pasta shapes."
        >
            <Quiz />
        </PageLayout>
    );
};

export default Home;
