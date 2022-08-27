import type { ExtractFnReturnType, QueryConfig } from 'lib/react-query';
import type { Question } from '../types';

import { useQuery } from '@tanstack/react-query';
import { sample, shuffle } from '../utils/random';

export const getQuestions = async (): Promise<Question[]> => {
    const { shapes, wrongAnswers } = await import('data/pasta.json');

    return sample(shapes, 10).map((shape) => {
        const answerPool = shapes
            .map((shapeObj) => shapeObj.name)
            .filter((name) => name !== shape.name)
            .concat(wrongAnswers);

        const answers = shuffle([shape.name, ...sample(answerPool, 3)]);

        return {
            imagePath: shape.imagePath,
            correctAnswer: shape.name,
            answers
        };
    });
};

type QueryFnType = typeof getQuestions;

type UseQuestionsOptions = {
    config?: QueryConfig<QueryFnType>;
};

export const useQuestions = ({ config }: UseQuestionsOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['questions'],
        queryFn: () => getQuestions(),
        ...config
    });
};
