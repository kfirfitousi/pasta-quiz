export type QuestionType = {
    imagePath: string;
    answers: string[];
    correctAnswer: string;
};

export type RoundData = {
    correctAnswer: string;
    userAnswer: string;
    timer: number;
};

export type GameData = RoundData[];
