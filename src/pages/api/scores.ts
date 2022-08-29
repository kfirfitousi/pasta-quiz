import type { NextApiRequest, NextApiResponse } from 'next';
import type { Score, ScoreList } from '@/features/leaderboard';
import type { SubmitResponse } from '@/features/quiz';

import { supabase } from '@/lib/initSupabase';
import { ScoreSubmitSchema } from '@/features/quiz';

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

            return res.status(200).json({
                scores: data,
                hasMore: (count ?? 0) > limit
            });
        }

        case 'POST': {
            const request = ScoreSubmitSchema.safeParse(req.body);

            if (!request.success) {
                return res
                    .status(400)
                    .end(request.error.issues.map((issue) => issue.message).join('\n'));
            }

            const { name, roundResults } = request.data;

            // calculate score based on round results
            const score = roundResults.reduce((acc, round) => {
                return round.isCorrect ? Math.ceil(acc + round.timer * 10) : acc;
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
