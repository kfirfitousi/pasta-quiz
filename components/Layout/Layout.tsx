import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
    children?: React.ReactNode;
    title: string;
    description: string;
};

const Layout = ({ children, title, description }: LayoutProps) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>

            <div className="container max-w-2xl m-auto px-4 select-none">
                <div className="flex flex-col h-screen">
                    <Header />

                    <main className="flex-grow mb-4">{children}</main>

                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Layout;
