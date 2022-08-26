export type Shape = {
    name: string;
    imagePath: string;
};

export type Question = {
    imagePath: string;
    answers: string[];
    correctAnswer: string;
};

export type Score = {
    name: string;
    score: number;
};

export type ScoreList = {
    scores: Score[];
    hasMore: boolean;
};

export type RoundData = {
    correctAnswer: string;
    answer: string;
    timer: number;
};

export type GameData = RoundData[];
