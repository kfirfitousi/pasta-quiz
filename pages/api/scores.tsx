import type { NextApiRequest, NextApiResponse } from 'next';
import type { GameData, ScoreType } from 'types';

import { supabase } from 'lib/initSupabase';

type ResponseData = {
    scoreList?: ScoreType[];
    error: boolean;
};

type RequestBody = {
    name: string;
    gameData: GameData;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method === 'POST') {
        const { gameData, name }: RequestBody = JSON.parse(req.body);
        const score = gameData.reduce((acc, round) => {
            if (round.question.correctAnswer === round.userAnswer) {
                return Math.ceil(acc + round.time * 10);
            }
            return acc;
        }, 0);

        const { error } = await supabase.from('leaderboard').insert({
            id: Date.now(),
            name,
            score
        });

        res.status(error ? 500 : 200).end();
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
