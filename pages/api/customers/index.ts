import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("payetonkawa");
    const clientCollection = await db.collection('customers');
    const {method, query} = req
    return new Promise(() => {
        switch (method) {
            case 'GET':
                clientCollection.find({}).toArray(function(err, result) {
                    if (err) throw err;
                    res.status(200).json({"code": 200, "data": result});
                });
                break
            case 'PUT':
                res.status(501).end();
                break
            case 'POST':
                res.status(501).end();
                break
            case 'DELETE':
                res.status(501).end();
                break
            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    })
}