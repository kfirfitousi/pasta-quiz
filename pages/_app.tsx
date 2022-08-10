import type { AppProps } from 'next/app';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Container from 'components/Container';
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
    return loading ? (
        <Container>
            <div className="h-screen w-screen flex items-center justify-center text-yellow-800">
                <div>
                    <Spinner size={100} />
                </div>
            </div>
        </Container>
    ) : (
        <Component {...pageProps} />
    );
}

export default PastaQuiz;
