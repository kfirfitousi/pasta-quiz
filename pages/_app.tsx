import type { AppProps } from 'next/app';

import { useState, useEffect } from 'react';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'lib/react-query';

import Spinner from '~/Spinner';

import 'styles/globals.css';

const PastaQuiz = ({ Component, pageProps, router }: AppProps) => {
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
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                {isLoading ? (
                    <div className="w-full h-20 absolute z-10 flex items-center inset-y-12 sm:inset-0 text-yellow-800">
                        <Spinner size="lg" />
                    </div>
                ) : null}

                <Component {...pageProps} />
            </Hydrate>
        </QueryClientProvider>
    );
};

export default PastaQuiz;
