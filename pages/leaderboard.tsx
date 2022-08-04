import { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { server } from 'config';

import Head from 'next/head';
import Header from 'components/Header';
import Container from 'components/Container';

import type { InferGetStaticPropsType } from 'next';
import type { ScoreType } from 'types';

type ScoreData = {
    scoreList?: ScoreType[];
};

export const getStaticProps: GetStaticProps<ScoreData> = async () => {
    const res = await fetch(`${server}/api/scores`);
    const { scoreList }: ScoreData = await res.json();
    return {
        props: {
            scoreList
        }
    };
};

const Leaderboard: NextPage<ScoreData> = ({
    scoreList
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <Container>
            <Head>
                <title>Pasta Quiz | Leaderboard</title>
                <meta name="description" content="Put your Pasta knowledge to the test!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            {scoreList ? (
                <div className="flex flex-col items-center mt-5 text-yellow-800">
                    <div className="flex flex-row text-center md:h-8">
                        <p className="w-52 md:w-80 md:leading-8 md:text-lg">Name</p>
                        <p className="w-20 md:leading-8 md:text-lg">Score</p>
                    </div>
                    {scoreList.map((player, index) => (
                        <div key={index} className="flex flex-row text-center md:h-8">
                            <p className="w-52 md:w-80 md:leading-8 md:text-lg bg-yellow-200 border-b border-solid border-yellow-300 select-all">
                                {player.name}
                            </p>
                            <p className="w-20 md:leading-8 md:text-lg bg-yellow-300 border-b border-solid border-yellow-400 select-all">
                                {player.score}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-xl text-center mt-5 text-yellow-800">
                    Error fetching leaderboard from database.
                </div>
            )}
        </Container>
    );
};

export default Leaderboard;
