export type Question = {
    imagePath: string;
    answers: string[];
    correctAnswer: string;
};

export type RoundData = {
    correctAnswer: string;
    answer: string;
    timer: number;
};

export type GameData = RoundData[];
