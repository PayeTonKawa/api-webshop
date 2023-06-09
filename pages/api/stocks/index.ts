import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";

/**
 * @swagger
 * /api/stocks/:
 *   get:
 *     tags:
 *       - Stocks
 *     summary: Get stock
 *     responses:
 *       200:
 *         description: todo
 *     security:
 *       - api_key: []
 *   put:
 *     tags:
 *       - Stocks
 *     summary: Add stock
 *     responses:
 *       200:
 *         description: todo
 *     security:
 *      - api_key: []
 * 
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("payetonkawa");
    const clientCollection = await db.collection('products');
    const {method, query} = req
    var resultArray = []
    return new Promise(() => {
        switch (method) {
            case 'GET':
                clientCollection.find({}).toArray(function(err, result) {
                    if (!result || result.length === 0) throw res.status(404).send({"code": 404, "error":"Not found"});
                    for (let index = 0; index < result.length; index++) {
                        const element = result[index];
                        resultArray.push({"stock": element.stock,"id": element.id})
                    }
                    
                    res.status(200).json({"code": 200, "data": resultArray});
                });
                break
            case 'PUT':
                res.status(501).end();
                break
            default:
                res.setHeader('Allow', ['GET', 'PUT']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    })
}