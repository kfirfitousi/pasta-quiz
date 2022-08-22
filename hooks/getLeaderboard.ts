import { useQuery } from '@tanstack/react-query';
import { axios } from 'lib/axios';

import type { ExtractFnReturnType, QueryConfig } from 'lib/react-query';

type Score = {
    name: string;
    score: number;
};

export const getLeaderboard = (limit = 10): Promise<Score[]> => {
    return axios.get('/scores', {
        params: {
            limit
        }
    });
};

type QueryFnType = typeof getLeaderboard;

type UseLeaderboardOptions = {
    limit: number;
    config?: QueryConfig<QueryFnType>;
};

export const useLeaderboard = ({ limit, config }: UseLeaderboardOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['leaderboard', limit],
        queryFn: () => getLeaderboard(limit),
        ...config
    });
};
