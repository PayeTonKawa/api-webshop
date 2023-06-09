import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";

/**
 * @swagger
 * /api/products/:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get products
 *     responses:
 *       200:
 *         description: todo
 *     security:
 *       - api_key: []
 *   put:
 *     tags:
 *       - Products
 *     summary: Add product
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
    return new Promise(() => {
        switch (method) {
            case 'GET':
                clientCollection.find({}).toArray(function(err, result) {
                    if (!result || result.length === 0) throw  res.status(404).send({"code": 404, "error":"Not found"});
                    res.status(200).json({"code": 200, "data": result});
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