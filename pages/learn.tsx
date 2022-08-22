import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';

import Layout from '~/Layout';
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
        <Layout
            title="Pasta Quiz | Learn"
            description="Put your Pasta knowledge to the test! 
            How many pasta shapes can you recognize?
            Learn about pasta shapes here."
        >
            <div className="flex flex-wrap justify-center mt-5">
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
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<LearnProps> = async () => {
    const pasta = await import('data/pasta.json');

    return {
        props: {
            shapes: pasta.shapes
        }
    };
};

export default Learn;
