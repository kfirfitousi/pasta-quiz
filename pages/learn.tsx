import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';

import Head from 'next/head';
import Header from 'components/Header';
import Container from 'components/Container';
import Image from 'next/image';

type ShapeType = {
    name: string;
    imagePath: string;
};

type LearnProps = {
    shapes: ShapeType[];
};

const Learn: NextPage<LearnProps> = ({
    shapes
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <Container>
            <Head>
                <title>Pasta Quiz | Learn</title>
                <meta
                    name="description"
                    content="Put your Pasta knowledge to the test! 
                    How many pasta shapes can you recognize?
                    Learn about pasta shapes here."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <div className="flex flex-wrap justify-center">
                {shapes.map((shape, index) => (
                    <div key={index} className="w-2/3 sm:w-1/2 lg:w-1/3 p-2">
                        <div className="w-full aspect-square object-cover relative">
                            <Image
                                src={`/${shape.imagePath}`}
                                alt={shape.name}
                                layout="fill"
                                className="rounded-t"
                            />
                        </div>
                        <h2 className="h-8 leading-8 text-lg text-center bg-yellow-300 text-yellow-800 rounded-b">
                            {shape.name}
                        </h2>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export const getStaticProps: GetStaticProps<LearnProps> = async () => {
    const pasta = await import('../data/pasta.json');
    return {
        props: {
            shapes: pasta.shapes
        }
    };
};

export default Learn;
