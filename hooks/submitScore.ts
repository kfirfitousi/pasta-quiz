import type { GameData } from 'types';

import { useMutation } from '@tanstack/react-query';
import { MutationConfig, queryClient } from 'lib/react-query';
import { axios } from 'lib/axios';

type SubmitParams = {
    name: string;
    gameData: GameData;
};

export const submitScore = ({ name, gameData }: SubmitParams) => {
    return axios.post('/api/scores', {
        name,
        gameData
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
