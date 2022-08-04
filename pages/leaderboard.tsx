import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { supabase } from 'lib/initSupabase';

import Head from 'next/head';
import Header from 'components/Header';
import Container from 'components/Container';

import type { InferGetServerSidePropsType } from 'next';
import type { ScoreType } from 'types';

type ScoreData = {
    scoreList: ScoreType[] | null;
};

export const getServerSideProps: GetServerSideProps<ScoreData> = async () => {
    const { error, data } = await supabase
        .from('leaderboard')
        .select('name, score')
        .limit(10)
        .order('score', { ascending: false });
    return {
        props: {
            scoreList: error ? null : data
        }
    };
};

const Leaderboard: NextPage<ScoreData> = ({
    scoreList
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
