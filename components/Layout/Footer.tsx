import Image from 'next/image';

const Footer = () => {
    return (
        <footer>
            <div className="flex flex-col text-center text-yellow-800">
                <div className="flex flex-row flex-wrap md:flex-nowrap justify-center items-center mx-auto my-2">
                    <span className="mb-2 md:mr-2 md:mb-0 w-full md:w-auto">Built with</span>
                    <Image
                        src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"
                        alt="React"
                        width="86.25"
                        height="28"
                    />
                    <Image
                        src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white"
                        alt="Next.js"
                        width="78"
                        height="28"
                    />
                    <Image
                        src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"
                        alt="TypeScript"
                        width="126.5"
                        height="28"
                    />
                    <Image
                        src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"
                        alt="TailwindCSS"
                        width="138.75"
                        height="28"
                    />
                    <Image
                        src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white"
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
