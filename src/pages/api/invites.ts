import { Session } from 'next-auth'
import { getSession } from 'next-auth/client'
import slugify from 'slugify'
export async function getAllInvites() {

  const session = await getSession()
  const user  = session?.user
  const inviteSlug = slugify(String(user?.name), {
    replacement: '-',  // replace spaces with replacement character, defaults to `-`
    remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
    lower: true,      // convert to lower case, defaults to `false`
    strict: false,     // strip special characters except replacement, defaults to `false`
    locale: 'pt-br',       // language code of the locale to use
    trim: true
  })
    const invite = {
      slug: inviteSlug,
      name: user?.name
    }

  return invite
}
export async function getInviteBySlug(session: Session ) {

  // const { user }  = session!

  const baseURL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://thumbs-generator.vercel.app'
  const inviteURL = `${baseURL}/api/ticket.png?name=${session?.user!.name}`

  return {
    name: session?.user!.name,
    avatar: session?.user!.image,
    inviteURL,
  }
}
