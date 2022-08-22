import type { ImageLoader } from 'next/image';

import Image from 'next/image';

const badgeLoader: ImageLoader = ({ src, width, quality }) => {
    return `https://img.shields.io/badge/${src}&w=${width}&q=${quality || 75}`;
};

const Footer = () => {
    return (
        <footer>
            <div className="flex flex-col text-xs md:text-sm text-center text-yellow-800">
                <span className="w-full">Built with</span>
                <div className="flex flex-row flex-nowrap justify-center items-center mx-auto my-2">
                    <Image
                        src="react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"
                        loader={badgeLoader}
                        alt="React"
                        width="86.25"
                        height="28"
                    />
                    <Image
                        src="Next-black?style=for-the-badge&logo=next.js&logoColor=white"
                        loader={badgeLoader}
                        alt="Next.js"
                        width="78"
                        height="28"
                    />
                    <Image
                        src="typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"
                        loader={badgeLoader}
                        alt="TypeScript"
                        width="126.5"
                        height="28"
                    />
                    <Image
                        src="tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"
                        loader={badgeLoader}
                        alt="TailwindCSS"
                        width="138.75"
                        height="28"
                    />
                    <Image
                        src="Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white"
                        loader={badgeLoader}
                        alt="Supabase"
                        width="113"
                        height="28"
                    />
                    <Image
                        src="vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white"
                        loader={badgeLoader}
                        alt="Vercel"
                        width="93.5"
                        height="28"
                    />
                </div>
                <span className="mb-4">
                    Source code available on&nbsp;
                    <a
                        href="https://github.com/kfirfitousi/pasta-quiz"
                        className="underline hover:text-yellow-600"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub
                    </a>
                    .
                </span>
            </div>
        </footer>
    );
};

export default Footer;
