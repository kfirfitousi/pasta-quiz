import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import Container from '~/Container';

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
            </Head>

            <Container>
                <div className="flex flex-col h-screen">
                    <Header />

                    <main className="flex-grow my-4">{children}</main>

                    <Footer />
                </div>
            </Container>
        </>
    );
};

export default Layout;
