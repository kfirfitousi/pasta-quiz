import type { ExtractFnReturnType, QueryConfig } from 'lib/react-query';
import type { ScoreList } from '../types';

import { useQuery } from '@tanstack/react-query';
import { axios } from 'lib/axios';

export const getLeaderboard = (limit = 10): Promise<ScoreList> => {
    return axios.get('/api/scores', {
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
