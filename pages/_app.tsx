import type { AppProps } from 'next/app';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head';
import Spinner from 'components/Spinner';

import '../styles/globals.css';

const PastaQuiz = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleRoutingStart = () => {
            setLoading(true);
        };

        const handleRoutingEnd = () => {
            setLoading(false);
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
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>

            {loading ? (
                <div className="w-screen h-20 absolute inset-y-10 sm:inset-0 -z-10 flex items-center text-yellow-800">
                    <Spinner size={80} />
                </div>
            ) : null}

            <Component {...pageProps} />
        </>
    );
};

export default PastaQuiz;
