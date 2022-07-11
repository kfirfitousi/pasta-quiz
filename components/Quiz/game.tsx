import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "../container";
import PostGame from "./postGame";

type QuestionType = {
    imagePath: string,
    answers: string[],
    correctAnswer: string
}

function QuizGame() {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [gameState, setGameState] = useState("pre-start");
    const [userAnswer, setUserAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(15);
    const [countdown, setCountdown] = useState(3);
    const [imgLoading, setImgLoading] = useState(true);

    const startQuiz = async () => {
        await fetchQuestions();
        setQuestionNumber(0);
        setUserAnswer("");
        setScore(0);
        setTimer(15);
        setCountdown(3);
        setGameState("countdown");
        setTimeout(() => {
            setGameState("in-progress");
        }, 3000);
    }

    const fetchQuestions = async () => {
        const pasta = await import('../../data/pasta.json');
        const questions = pasta.shapes
            .sort(() => Math.random() - 0.5)
            .slice(0, 10)
            .map(shape => ({
                imagePath: shape.imagePath,
                answers: [
                    shape.name,
                    ...pasta.shapes
                        .filter(s => s.name !== shape.name)
                        .sort(() => Math.random() - 0.5)
                        .slice(0, 3)
                        .map(s => s.name)
                ].sort(() => Math.random() - 0.5),
                correctAnswer: shape.name
            }));
        setQuestions(questions);
    }

    const handleAnswer = (answer: string) => {
        setUserAnswer(answer);
        if (answer === questions[questionNumber].correctAnswer) {
            setScore(Math.ceil(score + timer*10));
        }
        setTimeout(() => {
            nextQuestion();
        }, 1000);
    }

    const nextQuestion = () => {
        setUserAnswer("");
        if (questionNumber + 1 < questions.length) {
            setQuestionNumber(questionNumber + 1);
            setTimer(15);
            setImgLoading(true);
        } else {
            setGameState("post-game");
        }
    }

    useEffect(() => {
        let timerId: NodeJS.Timer;
        if (gameState === "in-progress" && !userAnswer && !imgLoading) {
            timerId = setInterval(() => {
                setTimer(timer - 0.1);
                if (timer < 0.1) {
                    clearInterval(timerId);
                    setTimer(0);
                    handleAnswer("no-answer");
                    setTimeout(() => {
                        nextQuestion();
                    }, 1000);
                }
            }, 100);
        }

        return () => clearInterval(timerId);
    });
    
    useEffect(() => {
        let countdownId: NodeJS.Timer;
        if (gameState === "countdown") {
            countdownId = setInterval(() => {
                setCountdown(countdown - 1);
            }, 1000);
        }

        return () => clearInterval(countdownId);
    })
    

    if (gameState === "pre-start") {
        return (
            <Container>
                <p className="text-xl text-center text-yellow-800 mt-44 md:mt-52">Put your pasta knowledge to the test!</p>
                <p className="md:w-2/3 mx-auto text-center text-yellow-800 mb-2">
                    There are 10 rounds, in each one you must name the pasta shape within 15 seconds.
                </p>

                <div className="w-36 mx-auto">
                    <button
                        className="bg-yellow-300 text-yellow-800 hover:bg-yellow-800 hover:text-yellow-300 rounded w-full h-8 mx-auto" 
                        onClick={() => startQuiz()}>
                            Play
                    </button>
                </div>
            </Container>
        )
    } else if (gameState === "countdown") {
        return (
            <Container>
                <h1 className="text-4xl text-yellow-800 text-center mt-52 select-none">{countdown}</h1>
            </Container>
        )
    } else if (gameState === "in-progress") {
        return (
            <Container>
                <div className="w-3/4 md:w-2/3 mx-auto flex justify-between text-center text-yellow-800 text-lg">
                    <p>{questionNumber + 1}/10</p>
                    <p>Score: {score}</p>
                </div>

                <div className="w-3/4 md:w-2/3 aspect-square mx-auto border border-solid border-yellow-500 rounded-sm relative">
                    <Image src={`/${questions[questionNumber].imagePath}`} layout="fill" alt="" priority onLoad={() => setImgLoading(false)}/>
                </div>
                <ul className="flex flex-row flex-wrap justify-between w-3/4 md:w-2/3 mx-auto mt-1">
                    {questions[questionNumber].answers.map(answer => (
                        <li className="w-full sm:w-1/2 my-0.5 px-0.5" key={answer}>
                            <button 
                                className={`
                                    w-full h-9 rounded select-none
                                    ${
                                        (userAnswer && answer === questions[questionNumber].correctAnswer) 
                                        ? 'text-yellow-100 bg-green-500' : 
                                        (userAnswer === answer && answer !== questions[questionNumber].correctAnswer) ||
                                        (userAnswer === "no-answer" && answer !== questions[questionNumber].correctAnswer)
                                        ? 'text-yellow-100 bg-red-500' : 'text-yellow-800 bg-yellow-300 hover:text-yellow-300 hover:bg-yellow-800'
                                    }
                                    ${answer.length > 20 ? 'text-sm' : 'text-lg'}
                                `}
                                disabled={userAnswer !== ""}
                                onClick={() => handleAnswer(answer)}>
                                    {answer}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="w-3/4 md:w-2/3 h-7 mx-auto mt-0.5 px-0.5">
                    <div 
                        className="text-sm leading-7 text-center text-yellow-900 bg-[url(/images/progress.png)] bg-cover bg-no-repeat h-full roundedpr-1"
                        style={{
                            backgroundSize: `${timer*100/15}% 100%`
                        }}>
                            {timer.toFixed(1)}
                    </div>
                </div>
            </Container>
        )
    } else {
        return <PostGame score={score} restartQuiz={startQuiz} />
    }
}

export default QuizGame