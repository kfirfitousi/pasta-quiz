import type { NextPage, GetStaticProps } from 'next';

import Layout from '~/Layout';
import Image from 'next/image';

type Shape = {
    name: string;
    imagePath: string;
};

type LearnProps = {
    shapes: Shape[];
};

const Learn: NextPage<LearnProps> = ({ shapes }) => {
    return (
        <Layout
            title="Pasta Quiz | Learn"
            description="Put your Pasta knowledge to the test! 
            How many pasta shapes can you recognize?
            Learn about pasta shapes here."
        >
            <div className="flex flex-row flex-wrap justify-center mt-5">
                {shapes.map((shape, index) => (
                    <div key={index} className="p-3 max-w-xs basis-4/5 sm:basis-1/2 lg:basis-1/3">
                        <div className="flex flex-col w-full aspect-square rounded-b shadow-md">
                            <div className="flex-shrink w-full h-full object-cover relative">
                                <Image
                                    src={shape.imagePath}
                                    alt={shape.name}
                                    layout="fill"
                                    className="rounded-t"
                                />
                            </div>

                            <h2 className="leading-10 text-xl text-center bg-yellow-300 text-yellow-800 rounded-b">
                                {shape.name}
                            </h2>
                        </div>
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
