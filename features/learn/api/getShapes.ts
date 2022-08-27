import type { ExtractFnReturnType, QueryConfig } from 'lib/react-query';
import type { Shape } from '../types';

import { useQuery } from '@tanstack/react-query';

export const getShapes = async (): Promise<Shape[]> => {
    const { shapes } = await import('data/pasta.json');
    return shapes;
};

type QueryFnType = typeof getShapes;

type UseShapesOptions = {
    config?: QueryConfig<QueryFnType>;
};

export const useShapes = ({ config }: UseShapesOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['shapes'],
        queryFn: () => getShapes(),
        ...config
    });
};
