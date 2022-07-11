import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/header'
import Container from '../components/container'
import QuizGame from '../components/Quiz/game'

const Home: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Pasta Quiz</title>
        <meta name="description" content="Put your Pasta knowledge to the test!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

      <QuizGame />
    </Container>
  )
}

export default Home
