import { GetServerSideProps, GetStaticProps, GetStaticPropsContext } from 'next'
import { getSession, useSession } from 'next-auth/client'
import { getAllInvites, getInviteBySlug } from './api/invites'

interface InviteProps {
  invite:{
    name: string
    avatar: string
    inviteURL: string
  }
}

function Invites(props: InviteProps) {
  console.log(props)
  const { name, avatar, inviteURL } = props.invite
  return (
    <>
    {/* Return here the same layout from home and link to back to gifts list */}
      <h1>SlugTs</h1>
      <p>{name}</p>
      <p>{inviteURL}</p>
      <img width="600" src={inviteURL} alt={name}/>
    </>
  )
}

export default Invites

export const getServerSideProps:GetServerSideProps = async ({ req, params, }) => {
  const session = await getSession({req})

  console.log(params)

  const invite = await getInviteBySlug(session!)
  console.log(invite, session)
  return {
    props:{invite}
  }
}

// export const getStaticPaths = async () => {

//   const invite = await getAllInvites()
//   return {
//     paths: [],
//     fallback:'blocking'
//   }
// }
// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const { slug } = params!
//   const session = await getSession()

//   const invite = await getInviteBySlug(session!)
//   console.log(invite, session)

//   const post = { invite
//   }

//   return {
//     props:{
//       post,
//     },
//     revalidate: 60 * 60 * 24 //24 hours
//   }
// }

