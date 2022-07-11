import { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/header'
import Container from '../components/container'
import { supabase } from '../lib/initSupabase'

type ScoreType = {
    name: string,
    score: number
}

type Props = {
    scoreList: ScoreType[]
}

const Leaderboard: NextPage<Props> = ({ scoreList }: Props) => {
    return (
        <Container>
            <Head>
                <title>Pasta Quiz | Leaderboard</title>
                <meta name="description" content="Put your Pasta knowledge to the test!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header/>

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
        </Container>
    )
}

export const getStaticProps = async () => {
    const { error, data } = await supabase
        .from('leaderboard')
        .select('name, score')
        .limit(10)
        .order('score', { ascending: false })
    if (error) {
        console.error(error);
    }
    return {
        props: {
            scoreList: data
        }
    }
}

export default Leaderboard
