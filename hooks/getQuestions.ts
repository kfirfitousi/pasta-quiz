import type { ExtractFnReturnType, QueryConfig } from 'lib/react-query';
import type { Question } from 'types';

import { useQuery } from '@tanstack/react-query';
import { sample, shuffle } from 'utils';

export const getQuestions = async (): Promise<Question[]> => {
    const pasta = await import('data/pasta.json');

    return sample(pasta.shapes, 10).map((shape) => {
        const answerPool = pasta.shapes
            .map((shapeObj) => shapeObj.name)
            .filter((name) => name !== shape.name)
            .concat(pasta.wrongAnswers);
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
