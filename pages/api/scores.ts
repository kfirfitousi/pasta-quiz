import type { NextApiRequest, NextApiResponse } from 'next';
import type { Score, ScoreList } from 'features/leaderboard';
import type { SubmitResponse } from 'features/quiz';

import { supabase } from 'lib/initSupabase';
import { SubmitSchema } from 'features/quiz';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ScoreList | SubmitResponse>
) {
    switch (req.method) {
        case 'GET': {
            const limit = +req.query.limit! || Infinity;

            const { error, data, count } = await supabase
                .from<Score>('leaderboard')
                .select('name, score', { count: 'exact' })
                .order('score', { ascending: false })
                .limit(limit);

            if (error) {
                return res.status(500).end('Error occured while fetching leaderboard');
            }

            const scoreList = {
                scores: data,
                hasMore: count! > limit
            };

            return res.status(200).json(scoreList);
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

            // find position of new score in leaderboard
            const { count } = await supabase
                .from('leaderboard')
                .select('*', { count: 'exact' })
                .gte('score', score);

            return res.status(200).json({
                position: count
            });
        }

        default: {
            res.setHeader('Allow', ['GET', 'POST']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }
}
