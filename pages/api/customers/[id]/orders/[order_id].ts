import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("payetonkawa");
    const clientCollection = await db.collection('customers');
    const {method, query} = req
    const id = query.id;
    const orderId = query.order_id;
    return new Promise(() => {
        switch (method) {
            case 'GET':
                clientCollection.find({id: id}).toArray(function(err, result) {
                    if (!result || result.length === 0) throw res.status(404).send({"code": 404, "error":"Not found"});

                    var order = result[0].orders.filter(function(item) {
                        if (item.id == orderId)
                        {
                            return item.id == orderId;
                        }
                    });
                    res.status(200).json({"code": 200, "data": order[0]});
                });
                break
            default:
                res.setHeader('Allow', ['GET']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    })
}