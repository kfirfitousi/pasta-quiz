import { useMutation } from '@tanstack/react-query';
import { axios } from 'lib/axios';
import { MutationConfig, queryClient } from 'lib/react-query';

import type { GameData } from 'types';

type SubmitScoreDTO = {
    name: string;
    gameData: GameData;
};

export const submitScore = ({ name, gameData }: SubmitScoreDTO) => {
    return axios.post('/scores', {
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
