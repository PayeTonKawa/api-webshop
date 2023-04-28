import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../../lib/mongodb";

/**
 * @swagger
 * /api/customers/{customer_id}/orders:
 *   get:
 *     tags:
 *       - Customers
 *     summary: Get customer orders
 *     responses:
 *       200:
 *         description: todo
 *     parameters:
 *       - name: customer_id
 *         in: path
 *         description: ID of customer
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("payetonkawa");
    const clientCollection = await db.collection('customers');
    const {method, query} = req
    const id = query.id;
    return new Promise(() => {
        switch (method) {
            case 'GET':
                clientCollection.find({id: id}).toArray(function(err, result) {
                    if (!result || result.length === 0) throw res.status(404).send({"code": 404, "error":"Not found"});
                    res.status(200).json({"code": 200, "data": result[0].orders});
                });
                break
            default:
                res.setHeader('Allow', ['GET']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    })
}