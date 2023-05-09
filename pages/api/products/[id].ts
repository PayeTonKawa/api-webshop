import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";

/**
 * @swagger
 * /api/products/{product_id}/:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get product by id
 *     responses:
 *       200:
 *         description: todo
 *     parameters:
 *       - name: product_id
 *         in: path
 *         description: ID of product
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     security:
 *      - api_key: []
 *   post:
 *     tags:
 *       - Products
 *     summary: Edit product by id
 *     responses:
 *       200:
 *         description: todo
 *     parameters:
 *       - name: product_id
 *         in: path
 *         description: ID of product
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     security:
 *      - api_key: []
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete product by id
 *     responses:
 *       200:
 *         description: todo
 *     parameters:
 *       - name: product_id
 *         in: path
 *         description: ID of product
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
                    if (!result || result.length === 0) throw  res.status(404).send({"code": 404, "error":"Not found"});
                    res.status(200).json({"code": 200, "data": result[0]});
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