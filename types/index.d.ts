export type QuestionType = {
    imagePath: string;
    answers: string[];
    correctAnswer: string;
};

export type RoundData = {
    question: QuestionType;
    userAnswer: string;
    timer: number;
};

export type GameData = RoundData[];
