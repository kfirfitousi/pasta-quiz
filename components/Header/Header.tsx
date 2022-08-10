import { useRouter } from 'next/router';

import Link from 'next/link';
import Container from 'components/Container';

function Header() {
    const router = useRouter();

    const routes = [
        ['/', 'Play'],
        ['/learn', 'Learn'],
        ['/leaderboard', 'Leaderboard']
    ] as const;

    return (
        <header className="py-6 text-yellow-800 select-none">
            <Container>
                <nav className="flex space-x-4">
                    <h2 className="font-bold min-w-fit mr-auto">Pasta Quiz</h2>
                    {routes.map(([path, name], index) => (
                        <Link href={path} key={index}>
                            <a
                                className={
                                    router.asPath === path ? 'underline underline-offset-8' : ''
                                }
                            >
                                {name}
                            </a>
                        </Link>
                    ))}
                </nav>
            </Container>
        </header>
    );
}

export default Header;
