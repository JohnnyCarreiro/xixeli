import { Container } from '../styles/Home'
import { SignInButton } from '@/components/SignInButton'
import { GetServerSideProps, GetStaticProps, GetStaticPropsContext } from 'next'
import { getSession, useSession } from 'next-auth/client'
import Head  from 'next/head'
import { getInviteBySlug } from './api/invites'

interface InviteProps {
  invite:{
    name: string
    avatar: string
    inviteURL: string
  }
}

function Invites(props: InviteProps) {
  const [session] = useSession()
  const { name, avatar, inviteURL } = props?.invite
  return (
    <Container>
      <Head>
        <title>Chá de Panela da Gisele</title>
      </Head>
      <header>
        <div className="nav">
          <div className="logo"><a href="/" >Chá de Panela da GI</a></div>
          {session && (
            <SignInButton />
          )}
        </div>
      </header>
      <section>
        <div className="list-container">
          <div className="invitation">
            <h1>{name}<br/>Agradecemos a presença</h1>
            <div>
              <p>Não se esqueça de fazer o download do seu convite!<br/> Aguarde a imagem ser gerada abaixo</p>
              <img width="600" src={inviteURL} alt={name}/>
            </div>
            <h3>Não se esqueça de contribuir ainda mais para nossa comemoração:
              <br/>
              Será muito legal se você puder trazer uma prato de que goste ou salgados e as suas bebibas preferidas
            </h3>
          </div>
        </div>
      </section>
    </Container>
  )
}

export default Invites

export const getServerSideProps:GetServerSideProps = async ({ req, params, }) => {

  const session = await getSession({req})

  const invite = await getInviteBySlug(session!)
  return {
    props:{invite}
  }
}
