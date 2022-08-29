import { useEffect, useState } from 'react';

type CountdownProps = {
    time: number;
    onComplete: () => void;
};

export const Countdown = ({ time, onComplete }: CountdownProps) => {
    const [timer, setTimer] = useState(time);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        const timer = setTimeout(() => {
            onComplete();
        }, time * 1000);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [time, onComplete]);

    return <div className="text-8xl text-yellow-800 text-center mb-20 select-none">{timer}</div>;
};
