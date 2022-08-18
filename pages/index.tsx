import type { NextPage } from 'next';

import Layout from '~/Layout';
import Quiz from '~/Quiz';

const Home: NextPage = () => {
    return (
        <Layout
            title="Pasta Quiz"
            description="Put your Pasta knowledge to the test! 
            How many pasta shapes can you recognize?
            Take the quiz or learn more about pasta shapes."
        >
            <Quiz />
        </Layout>
    );
};

export default Home;
