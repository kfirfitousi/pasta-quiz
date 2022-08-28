type IntroProps = {
    initGame: () => void;
};

export const Intro = ({ initGame }: IntroProps) => {
    return (
        <>
            <p className="text-xl text-center text-yellow-800">
                Put your pasta knowledge to the test!
            </p>
            <p className="md:w-2/3 mx-auto  mb-3 text-center text-yellow-800">
                There are 10 rounds, in each one you must name the pasta shape within 15 seconds.
            </p>

            <div className="w-32 mx-auto mb-20">
                <button
                    className="w-full h-9 mx-auto rounded shadow-md bg-yellow-300 text-yellow-800 hover:bg-yellow-800 hover:text-yellow-300"
                    onClick={() => initGame()}
                >
                    Play
                </button>
            </div>
        </>
    );
};
