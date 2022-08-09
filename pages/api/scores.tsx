import type { NextApiRequest, NextApiResponse } from 'next';
import type { GameData } from 'types';

import { supabase } from 'lib/initSupabase';

type RequestBody = {
    name: string;
    gameData: GameData;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { gameData, name }: RequestBody = JSON.parse(req.body);
        const score = gameData.reduce((acc, round) => {
            return round.userAnswer === round.question.correctAnswer
                ? Math.ceil(acc + round.timer * 10)
                : acc;
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
