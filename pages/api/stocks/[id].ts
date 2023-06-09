import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";

/**
 * @swagger
 * /api/stocks/{stock_id}/:
 *   get:
 *     tags:
 *       - Stocks
 *     summary: Get stock by id
 *     responses:
 *       200:
 *         description: todo
 *     parameters:
 *       - name: stock_id
 *         in: path
 *         description: ID of stock
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     security:
 *      - api_key: []
 *   post:
 *     tags:
 *       - Stocks
 *     summary: Edit stock by id
 *     responses:
 *       200:
 *         description: todo
 *     parameters:
 *       - name: stock_id
 *         in: path
 *         description: ID of stock
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     security:
 *      - api_key: []
 *   delete:
 *     tags:
 *       - Stocks
 *     summary: Delete stock by id
 *     responses:
 *       200:
 *         description: todo
 *     parameters:
 *       - name: stock_id
 *         in: path
 *         description: ID of stock
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     security:
 *      - api_key: []
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("payetonkawa");
    const clientCollection = await db.collection('products');
    const {method, query} = req
    const id = query.id;
    return new Promise(() => {
        switch (method) {
            case 'GET':
                clientCollection.find({id: id}).toArray(function(err, result) {
                    if (!result || result.length === 0) throw res.status(404).send({"code": 404, "error":"Not found"});
                    const stock = result[0].stock
                    const stock_id = result[0].id
                    res.status(200).json({"code": 200, "data": {"stock": stock,"id": stock_id}});
                });
                break
            case 'POST':
                res.status(501).end();
                break
            case 'DELETE':
                res.status(501).end();
                break
            default:
                res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    })
}