import type { AppProps } from 'next/app';

import '../styles/globals.css';

function PastaQuiz({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default PastaQuiz;
