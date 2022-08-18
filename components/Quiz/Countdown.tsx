import { useEffect, useState } from 'react';

type CountdownProps = {
    startGame: () => void;
};

const Countdown = ({ startGame }: CountdownProps) => {
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (countdown <= 0) {
            startGame();
        }
    }, [countdown, startGame]);

    return (
        <section className="h-full flex flex-col justify-center">
            <h1 className="text-8xl text-yellow-800 text-center mb-20 select-none">{countdown}</h1>
        </section>
    );
};

export default Countdown;
