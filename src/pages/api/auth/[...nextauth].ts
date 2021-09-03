import NextAuth from "next-auth"
import Providers from "next-auth/providers"

import { query as q } from 'faunadb'

import { fauna } from '../../../services/fauna'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN,
      scope: 'read:name',
      authorizationParams:{ RTCPeerConnection:'facebook' }
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    })
    // ...add more providers here
  ],
  callbacks:{
    async session(session) {
      let { user } = session
      try {

        const userRef = await fauna.query(
          q.Select(
            'ref',
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user?.email as string)
              )
            )
          )
        )
        return {
          ...session,
          userRef,
        }
      } catch (error) {
        return {
          ...session,
          userRef : null
        }
      }

    },
    async signIn(user, account, profile){
      const { email, name, image } = user
      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email as string)
                )
              ),
            ),
            q.Create(
              q.Collection('users'),
              { data: { name, email, image } }
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email as string)
              )
            )
          )
        )
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    }
  }

  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
})
