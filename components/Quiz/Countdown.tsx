import type { NextPage } from 'next';

import { useEffect, useState } from 'react';

import Container from 'components/Container';

type Props = {
    startGame: () => void;
};

const Countdown: NextPage<Props> = ({ startGame }: Props) => {
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        if (countdown > 0) {
            setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        } else {
            startGame();
        }
    }, [countdown, startGame]);

    return (
        <Container>
            <h1 className="text-4xl text-yellow-800 text-center mt-52 select-none">{countdown}</h1>
        </Container>
    );
};

export default Countdown;
