import { useRouter } from 'next/router';

import Link from 'next/link';
import clsx from 'clsx';

const Header = () => {
    const router = useRouter();

    const routes = [
        ['/', 'Play'],
        ['/learn', 'Learn'],
        ['/leaderboard', 'Leaderboard']
    ];

    return (
        <header className="py-6 text-yellow-800 select-none">
            <nav className="flex items-center space-x-0 md:space-x-1">
                <div className="text-4xl font-title font-bold min-w-fit mr-auto">Pasta Quiz</div>

                {routes.map(([path, name]) => (
                    <Link href={path} key={name}>
                        <a
                            className={clsx(
                                'p-1.5 sm:p-2.5 rounded hover:text-yellow-300 hover:bg-yellow-800 hover:shadow-md',
                                router.asPath === path && 'underline underline-offset-8'
                            )}
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
