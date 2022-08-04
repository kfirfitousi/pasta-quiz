export type QuestionType = {
    imagePath: string;
    answers: string[];
    correctAnswer: string;
};

export type GameData = {
    question: QuestionType;
    userAnswer: string;
    time: number;
}[];

type ScoreType = {
    name: string;
    score: number;
};
