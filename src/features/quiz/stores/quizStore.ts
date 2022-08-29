import type { RoundResult, Question } from '../types';

import create from 'zustand';

const ROUND_TIMER_SECONDS = 15;

export type QuizStore = {
    gameState: 'intro' | 'countdown' | 'game' | 'post-game';
    questions: Question[];
    roundNumber: number;
    roundResults: RoundResult[];
    userAnswer: string;
    score: number;
    timer: number;
    intervalId: NodeJS.Timer | null;
    timeoutId: NodeJS.Timeout | null;
    error: string | null;
    initGame: (questions?: Question[]) => void;
    handleAnswer: (answer: string, timer: number) => void;
    startTimer: (seconds: number) => void;
    stopTimer: () => void;
    startGame: () => void;
    nextRound: () => void;
    reset: () => void;
};

export const useQuizStore = create<QuizStore>((set) => ({
    gameState: 'intro',
    questions: [],
    roundNumber: 1,
    roundResults: [],
    userAnswer: '',
    score: 0,
    timer: ROUND_TIMER_SECONDS,
    intervalId: null,
    timeoutId: null,
    error: null,

    initGame: (questions?: Question[]) => {
        set((state) => {
            if (!questions) {
                return {
                    error: 'Did not receive questions data'
                };
            }

            state.stopTimer();

            return {
                gameState: 'countdown',
                questions,
                roundNumber: 1,
                roundResults: [],
                userAnswer: '',
                score: 0,
                timer: ROUND_TIMER_SECONDS,
                intervalId: null,
                timeoutId: null,
                error: null
            };
        });
    },

    startGame: () => {
        set((state) => {
            if (state.gameState === 'countdown') {
                state.startTimer(ROUND_TIMER_SECONDS);

                return {
                    gameState: 'game'
                };
            }

            return {
                error: 'Game can only be started from countdown'
            };
        });
    },

    handleAnswer: (answer: string, timer: number) => {
        set((state) => {
            state.stopTimer();

            const isCorrect = answer === state.questions[state.roundNumber - 1].correctAnswer;

            return {
                userAnswer: answer,
                score: isCorrect ? Math.ceil(state.score + timer * 10) : state.score,
                roundResults: [...state.roundResults, { isCorrect, timer }]
            };
        });
    },

    nextRound: () => {
        set((state) => {
            if (state.roundNumber === state.questions.length) {
                return {
                    gameState: 'post-game'
                };
            }

            state.startTimer(ROUND_TIMER_SECONDS);

            return {
                roundNumber: state.roundNumber + 1,
                userAnswer: '',
                gameState: 'game'
            };
        });
    },

    startTimer: (seconds: number) => {
        set((state) => {
            if (state.intervalId) {
                clearInterval(state.intervalId);
            }
            if (state.timeoutId) {
                clearTimeout(state.timeoutId);
            }

            return {
                timer: seconds,
                intervalId: setInterval(() => {
                    set((state) => ({ timer: state.timer - 0.1 }));
                }, 100),
                timeoutId: setTimeout(() => {
                    state.handleAnswer('no-answer', state.timer);
                    setTimeout(() => {
                        state.nextRound();
                    }, 1000);
                }, ROUND_TIMER_SECONDS * 1000 + 500)
            };
        });
    },

    stopTimer: () => {
        set((state) => {
            if (state.intervalId) {
                clearInterval(state.intervalId);
            }
            if (state.timeoutId) {
                clearTimeout(state.timeoutId);
            }

            return {
                intervalId: null,
                timeoutId: null
            };
        });
    },

    reset: () => {
        set((state) => {
            state.stopTimer();

            return {
                gameState: 'intro',
                questions: [],
                roundNumber: 1,
                roundResults: [],
                userAnswer: '',
                score: 0,
                timer: ROUND_TIMER_SECONDS,
                intervalId: null,
                timeoutId: null,
                error: null
            };
        });
    }
}));
