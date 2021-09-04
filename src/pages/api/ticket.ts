import { NextApiRequest, NextApiResponse } from "next-auth/internals/utils";
import path from "path"
import { getSession } from "next-auth/client"

import getTicketTemplate from "./_lib/ticketTemplate"
import { getScreenShot } from "./_lib/chromium"


const isDev = !process.env.AWS_REGION

export default async function (req: NextApiRequest, res: NextApiResponse) {

  const session =  await getSession({req})
  try {
    const query = req.query
    const name = String(query.name)
    const avatarURL = String(session?.user?.image)

    if(!name && avatarURL){
      throw new Error('Name and avatar are required')
    }
    const dirRelativeToPublicFolder = 'assets/images/BG.png'

    const bgImg = path.resolve(__dirname,'./public', dirRelativeToPublicFolder)

    // const filenames = fs.readdirSync(dir)

    const html = getTicketTemplate(name, avatarURL, bgImg )

    const file = await getScreenShot(html, isDev)

    // res.setHeader('Content-type', 'text/html')
    res.setHeader('Content-type', 'image/png')
    res.setHeader('Cache-Control', 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000')
    return res.end(file)

  } catch (error) {
    console.log(error)

    res.status(500).send('Internal server error')
  }
}
