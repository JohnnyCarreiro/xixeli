import { NextApiRequest, NextApiResponse } from "next"
import { query as q } from 'faunadb'

import { fauna } from "@/services/fauna"

export default async function(req: NextApiRequest, res: NextApiResponse){
  const { gift, userRef } = req.body

  try {
    const id = userRef ? String(userRef['@ref'].id) : ''
    if(gift.isSelected === true){
      const userRef = await fauna.query(
        q.Select(
          'ref',
          q.Get(
            q.Match(
              q.Index('user_by_id'),
              q.Casefold(id)
            )
          )
        )
      )
      const response = await fauna.query(
        q.Update(
          q.Select(
            'ref',
            q.Get(
              q.Match(
                q.Index('gift_by_itemNumber'),
                q.Casefold(String(gift.itemNumber))
              )
            )
          ),
          {
            data:{
              isSelected: gift.isSelected,
              userRef
            }
          }
        )
    )
    return res.status(200).send(response)
    }

    const response = await fauna.query(
        q.Update(
          q.Select(
            'ref',
            q.Get(
              q.Match(
                q.Index('gift_by_itemNumber'),
                q.Casefold(String(gift.itemNumber))
              )
            )
          ),
          {
            data:{
              isSelected: gift.isSelected,
              userRef: ''
            }
          }
        )
    )
    res.status(200).send(response)

  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
}
