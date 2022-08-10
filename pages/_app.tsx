import type { AppProps } from 'next/app';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Spinner from 'components/Spinner';

import '../styles/globals.css';

function PastaQuiz({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        router.events.on('routeChangeStart', () => setLoading(true));
        router.events.on('routeChangeComplete', () => setLoading(false));
        router.events.on('routeChangeError', () => setLoading(false));
        return () => {
            router.events.off('routeChangeStart', () => setLoading(true));
            router.events.off('routeChangeComplete', () => setLoading(false));
            router.events.off('routeChangeError', () => setLoading(false));
        };
    }, [router]);
    return (
        <>
            {loading ? (
                <div className="w-screen h-20 absolute inset-y-10 sm:inset-0 flex items-center text-yellow-800">
                    <Spinner size={80} />
                </div>
            ) : null}
            <Component {...pageProps} />
        </>
    );
}

export default PastaQuiz;
