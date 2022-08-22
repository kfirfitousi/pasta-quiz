import type { ExtractFnReturnType, QueryConfig } from 'lib/react-query';
import type { Question } from 'types';

import { useQuery } from '@tanstack/react-query';

export const getQuestions = async (): Promise<Question[]> => {
    const pasta = await import('data/pasta.json');

    return pasta.shapes
        .sort(() => Math.random() - 0.5)
        .slice(0, 10)
        .map((shape) => ({
            imagePath: shape.imagePath,
            answers: [
                shape.name,
                ...pasta.shapes
                    .map((s) => s.name)
                    .filter((name) => name !== shape.name)
                    .concat(pasta.wrongAnswers)
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 3)
            ].sort(() => Math.random() - 0.5),
            correctAnswer: shape.name
        }));
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
