export type Question = {
    imagePath: string;
    answers: string[];
    correctAnswer: string;
};

export type RoundResult = {
    isCorrect: boolean;
    timer: number;
};

export type SubmitResponse = {
    position: number | null;
};
