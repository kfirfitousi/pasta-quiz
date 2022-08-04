import type { NextPage } from 'next';
import Head from 'next/head';
import Header from 'components/Header';
import Container from 'components/Container/Container';
import Quiz from 'components/Quiz';

const Home: NextPage = () => {
    return (
        <Container>
            <Head>
                <title>Pasta Quiz</title>
                <meta name="description" content="Put your Pasta knowledge to the test!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <Quiz />
        </Container>
    );
};

export default Home;
