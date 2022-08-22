export type Question = {
    imagePath: string;
    answers: string[];
    correctAnswer: string;
};

type Score = {
    name: string;
    score: number;
};

export type RoundData = {
    correctAnswer: string;
    answer: string;
    timer: number;
};

export type GameData = RoundData[];
