import fsLocker from '@/firestore/locker'
import priceService from '@/services/price'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const data = req.body
      const result = await fsLocker.upsert(data)
    }

    if (req.method === 'GET') {
      const data = req.query
      const address = data?.address
      const result = await fsLocker.getAllByReceipt(address as string)

      return res.status(200).send(result)
    }
  } catch (error) {
    return res.status(400).send({})
  }
}
