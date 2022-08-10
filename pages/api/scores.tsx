import type { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from 'lib/initSupabase';
import { z } from 'zod';

const schema = z.object({
    name: z.string().min(1),
    gameData: z
        .array(
            z.object({
                correctAnswer: z.string(),
                userAnswer: z.string(),
                timer: z.number().min(0).max(15)
            })
        )
        .length(10)
});

type ApiResponse = {
    error: {
        message: string;
    } | null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const request = schema.safeParse(req.body);

    if (!request.success) {
        return res.status(400).json({
            error: {
                message: 'Invalid payload'
            }
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

    if (error) {
        return res.status(500).json({
            error: {
                message: 'Error occured while saving score'
            }
        });
    }

    return res.status(200).json({
        error: null
    });
}
