import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next';

import Head from 'next/head';
import Header from 'components/Header';
import Container from 'components/Container';

import { supabase } from 'lib/initSupabase';

type ScoreType = {
    name: string;
    score: number;
};

type Props = {
    scoreList: ScoreType[] | null;
};

const Leaderboard: NextPage<Props> = ({
    scoreList
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <Container>
            <Head>
                <title>Pasta Quiz | Leaderboard</title>
                <meta
                    name="description"
                    content="Put your Pasta knowledge to the test! 
                    How many pasta shapes can you recognize?
                    Check the leaderboard to see the current high scores."
                />
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

export const getServerSideProps: GetServerSideProps<Props> = async ({ res }) => {
    res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
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

export default Leaderboard;
