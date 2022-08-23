import { useShapes } from 'hooks/getShapes';

import PastaCard from './PastaCard';

const PastaCards = () => {
    const { data, isError } = useShapes();

    if (isError) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-yellow-800">
                <p>Error occured while fetching shapes.</p>
                <p>Try refreshing the page.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-row flex-wrap justify-center mt-5">
            {data?.map((shape) => (
                <PastaCard shape={shape} key={shape.name} />
            ))}
        </div>
    );
};

export default PastaCards;
