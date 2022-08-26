import type { Shape } from 'types';

import { useState } from 'react';

import Image from 'next/image';

type PastaCardProps = {
    shape: Shape;
};

const PastaCard = ({ shape }: PastaCardProps) => {
    const [isOpen, setIsOpen] = useState(false);

    if (isOpen) {
        return (
            <div className="p-3 w-full">
                <div className="flex flex-row w-full h-full rounded shadow-md">
                    <div className="w-full aspect-square object-cover rounede-l relative">
                        <Image
                            src={shape.imagePath}
                            alt={shape.name}
                            layout="fill"
                            className="rounded-l"
                        />
                    </div>

                    <div className="relative w-full rounded-r bg-yellow-300 text-yellow-800">
                        <div
                            className="w-fit absolute right-0 px-2 cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        >
                            &#10176;
                        </div>

                        <div className="w-full pr-6 pl-2 pt-2 text-xl sm:text-2xl text-center">
                            {shape.name}
                        </div>

                        {/* TODO: add description to each shape */}
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div
                className="p-3 max-w-xs basis-4/5 sm:basis-1/2 lg:basis-1/3 cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                <div className="flex flex-col w-full aspect-square rounded shadow-md bg-yellow-300 text-yellow-800 hover:bg-yellow-800 hover:text-yellow-300 hover:-translate-y-2">
                    <div className="flex-shrink w-full h-full object-cover relative">
                        <Image
                            src={shape.imagePath}
                            alt={shape.name}
                            layout="fill"
                            className="rounded-t"
                        />
                    </div>

                    <label className="rounded-b leading-10 text-xl text-center">{shape.name}</label>
                </div>
            </div>
        );
    }
};

export default PastaCard;
