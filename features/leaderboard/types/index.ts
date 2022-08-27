export type Score = {
    name: string;
    score: number;
};

export type ScoreList = {
    scores: Score[];
    hasMore: boolean;
};
