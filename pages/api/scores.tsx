import type { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from 'lib/initSupabase';
import { z } from 'zod';

const schema = z.object({
    name: z.string(),
    gameData: z
        .array(
            z.object({
                correctAnswer: z.string(),
                userAnswer: z.string(),
                timer: z.number()
            })
        )
        .length(10)
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const request = schema.safeParse(JSON.parse(req.body));

    if (!request.success) {
        return res.status(400).send({
            message: 'Invalid Payload'
        });
    }

    const { name, gameData } = request.data;

    const score = gameData.reduce((total, round) => {
        return round.userAnswer === round.correctAnswer
            ? Math.ceil(total + round.timer * 10)
            : total;
    }, 0);

    const { error } = await supabase.from('leaderboard').insert({
        id: Date.now(),
        name,
        score
    });

    res.status(error ? 500 : 200).end();
}
