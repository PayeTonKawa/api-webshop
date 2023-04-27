import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("payetonkawa");
    const clientCollection = await db.collection('products');
    const {method, query} = req

    return new Promise(() => {
        switch (method) {
            case 'GET':
                clientCollection.find({}).toArray(function(err, result) {
                    if (err) throw err;
                    res.status(200).json(result);
                });
                break
            default:
                res.setHeader('Allow', ['GET']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    })
}