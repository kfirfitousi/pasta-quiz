import { useRouter } from 'next/router';

import Link from 'next/link';

const Header = () => {
    const router = useRouter();

    const routes: [string, string][] = [
        ['/', 'Play'],
        ['/learn', 'Learn'],
        ['/leaderboard', 'Leaderboard']
    ];

    return (
        <header className="py-6 text-yellow-800 select-none">
            <nav className="flex items-center space-x-0 md:space-x-1">
                <h2 className="text-3xl font-title font-bold min-w-fit mr-auto">Pasta Quiz</h2>
                {routes.map(([path, name], index) => (
                    <Link href={path} key={index}>
                        <a
                            className={`
                            hover:text-yellow-300 hover:bg-yellow-800 p-1 md:p-2 rounded
                            ${router.asPath === path ? 'underline underline-offset-8' : ''}
                            `}
                        >
                            {name}
                        </a>
                    </Link>
                ))}
            </nav>
        </header>
    );
};

export default Header;
