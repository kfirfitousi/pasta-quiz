import type { AppProps } from 'next/app';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Spinner from '~/Spinner';

import 'styles/globals.css';

const PastaQuiz = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleRoutingStart = () => {
            setIsLoading(true);
        };

        const handleRoutingEnd = () => {
            setIsLoading(false);
        };

        router.events.on('routeChangeStart', handleRoutingStart);
        router.events.on('routeChangeComplete', handleRoutingEnd);
        router.events.on('routeChangeError', handleRoutingEnd);
        return () => {
            router.events.off('routeChangeStart', handleRoutingStart);
            router.events.off('routeChangeComplete', handleRoutingEnd);
            router.events.off('routeChangeError', handleRoutingEnd);
        };
    }, [router]);

    return (
        <>
            {isLoading ? (
                <div className="w-screen h-20 absolute inset-y-12 sm:inset-0 z-100 flex items-center text-yellow-800">
                    <Spinner size={80} />
                </div>
            ) : null}

            <Component {...pageProps} />
        </>
    );
};

export default PastaQuiz;
