import type { NextPage } from 'next';

import Head from 'next/head';
import Header from '~/Header';
import Container from '~/Container';
import Quiz from '~/Quiz';

const Home: NextPage = () => {
    return (
        <Container>
            <Head>
                <title>Pasta Quiz</title>
                <meta
                    name="description"
                    content="Put your Pasta knowledge to the test! 
                    How many pasta shapes can you recognize?
                    Take the quiz or learn more about pasta shapes."
                />
            </Head>

            <Header />

            <Quiz />
        </Container>
    );
};

export default Home;
