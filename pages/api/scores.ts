import type { NextApiRequest, NextApiResponse } from 'next';
import type { Score } from 'types';

import { supabase } from 'lib/initSupabase';
import { SubmitSchema } from '~/Quiz';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            const limit = parseInt(req.query.limit as string) || Infinity;

            const { error, data } = await supabase
                .from<Score>('leaderboard')
                .select('name, score')
                .order('score', { ascending: false })
                .limit(limit);

            if (error) {
                return res.status(500).end('Error occured while fetching leaderboard');
            }

            return res.status(200).json(data);
        }

        case 'POST': {
            const request = SubmitSchema.safeParse(req.body);

            if (!request.success) {
                return res
                    .status(400)
                    .end(request.error.issues.map((issue) => issue.message).join('\n'));
            }

            const { name, gameData } = request.data;

            // calculate score based on game data
            const score = gameData.reduce((total, round) => {
                return round.answer === round.correctAnswer
                    ? Math.ceil(total + round.timer * 10)
                    : total;
            }, 0);

            const { error } = await supabase.from('leaderboard').insert({
                id: Date.now(),
                name,
                score
            });

            if (error) {
                return res.status(500).end('Error occured while saving score');
            }

            return res.status(200).end();
        }

        default: {
            res.setHeader('Allow', ['GET', 'POST']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }
}
