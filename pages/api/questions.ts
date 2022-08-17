import type { NextApiRequest, NextApiResponse } from 'next';
import type { QuestionType } from 'types';

type ApiResponse = {
    questions: QuestionType[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const pasta = await import('data/pasta.json');

    res.status(200).json({
        questions: pasta.shapes
            .sort(() => Math.random() - 0.5)
            .slice(0, 10)
            .map((shape) => ({
                imagePath: shape.imagePath,
                answers: [
                    shape.name,
                    ...pasta.shapes
                        .map((s) => s.name)
                        .filter((name) => name !== shape.name)
                        .concat(pasta.wrongAnswers)
                        .sort(() => Math.random() - 0.5)
                        .slice(0, 3)
                ].sort(() => Math.random() - 0.5),
                correctAnswer: shape.name
            }))
    });
}
