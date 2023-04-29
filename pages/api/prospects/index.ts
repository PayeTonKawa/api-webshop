import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";

/**
 * @swagger
 * /api/prospects/:
 *   get:
 *     tags:
 *       - Prospects
 *     summary: Get prospects
 *     responses:
 *       200:
 *         description: todo
 *     security:
 *       - api_key: []
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("payetonkawa");
    const clientCollection = await db.collection('customers');
    const {method, query} = req

    return new Promise(() => {
        switch (method) {
            case 'GET':
                clientCollection.find({orders: {$exists: true, $eq: []}}).toArray(function(err, result) {
                    if (!result || result.length === 0) throw res.status(404).send({"code": 404, "error":"Not found"});
                    res.status(200).json({"code": 200, "data": result});
                });
                break
            default:
                res.setHeader('Allow', ['GET']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    })
}