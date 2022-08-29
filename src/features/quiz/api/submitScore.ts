import type { RoundResult, SubmitResponse } from '../types';

import { useMutation } from '@tanstack/react-query';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { axios } from '@/lib/axios';

type SubmitParams = {
    name: string;
    roundResults: RoundResult[];
};

export const submitScore = ({ name, roundResults }: SubmitParams): Promise<SubmitResponse> => {
    return axios.post('/api/scores', {
        name,
        roundResults
    });
};

type SubmitScoreOptions = {
    config?: MutationConfig<typeof submitScore>;
};

export const useSubmitScore = ({ config }: SubmitScoreOptions = {}) => {
    return useMutation({
        onSuccess: () => queryClient.invalidateQueries(['leaderboard']),
        mutationFn: submitScore,
        ...config
    });
};
