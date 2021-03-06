import { useCallback, useMemo, useRef, useState } from 'react'
import Head from 'next/head'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { getSession, useSession } from 'next-auth/client'
import { query as q } from 'faunadb'

import { fauna } from '../services/fauna'
import { Checkbox } from '@/components/Checkbox'
import { Container } from '../styles/Home'
import { SignInButton } from '@/components/SignInButton'
import { GetServerSideProps, GetStaticProps } from 'next'
import { api } from '@/services/api'
import { getAllInvites } from './api/invites'
import { Session } from 'next-auth'

type Gift = {
  id: string
  index: number
  name: string
  itemNumber: string
  isSelected: boolean
  userRef?:string
}

interface IGiftProps {
  gifts: Array<Gift>
  authenticated: Session
}

export default function Home({gifts, authenticated}:IGiftProps) {
  // const [ session ] = useSession()
  const [ session, setSession ] = useState(authenticated)
  const [ userID, setUserID ] = useState('')
  const [giftsList, setGiftList] = useState(gifts)
  const formRef = useRef<FormHandles>(null)
  const [ticket, setTicket] = useState('')

  const userRef = session?.userRef
  const userString  = JSON.stringify(userRef)
  useMemo(() => {
    setUserID(userRef ? String(JSON.parse(userString)['@ref'].id) : '')
  },[session])
useMemo(async () => {
  const invite = await getAllInvites()
  setTicket(invite.slug)
},[session])
  const handleCheck = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const current = event.target.value

    if(giftsList.find(({itemNumber}) => itemNumber === current)){
      const newCheckeds = giftsList.map(checked => {
        if(checked.itemNumber  === current ){
          checked.isSelected = event.target.checked
        }
        return checked
      })

      setGiftList(newCheckeds)
      try {
        const gift = giftsList.find(({itemNumber}) => itemNumber === current)
        const response = await api.post('/submit', { gift, userRef })

        const giftIndex = Object.entries(giftsList)?.map(([id, gift]) => (gift.itemNumber)).indexOf(current)

        const { data } = response
        const userID = JSON.stringify(data.data.userRef)

        const newGift = giftsList.map(checked => {
          if(checked.itemNumber  === current ){
            checked.isSelected = event.target.checked
            checked.userRef = data.data?.userRef && String(JSON.parse(userID)['@ref'].id)
          }
          return checked
        })
        setGiftList(newGift)

      } catch (error) {
      }
      return
    }
  },[userID, giftsList, session])

  return (
    <Container>
      <Head>
        <title>Ch?? de Panela da Gisele</title>
      </Head>
      <header>
        <div className="nav">
          <div className="logo"><a href="/" >Ch?? de Panela da GI</a></div>
          {session && (
            <SignInButton />
          )}
        </div>
      </header>
      <section>
        <div className="list-container">
          <h1>Lista de Presentes</h1>
            {
              session ? (
                <Form ref={formRef} onSubmit={() => {}} className="list">
                  {
                    giftsList.map(gift => {
                      if(gift.userRef === userID){
                        return (
                          <Checkbox
                            key={gift.index}
                            id={gift.itemNumber}
                            name={gift.name}
                            type="checkbox"
                            label={gift.name}
                            isChecked={gift.isSelected}
                            value={gift.itemNumber}
                            onChange={handleCheck}
                          />
                        )
                      }
                      if(gift.userRef !== userID || !gift.userRef){
                        return (
                          <Checkbox
                            key={gift.index}
                            id={gift.itemNumber}
                            name={gift.name}
                            type="checkbox"
                            label={gift.name}
                            isChecked={gift.isSelected}
                            value={gift.itemNumber}
                            disabled={gift.isSelected}
                            onChange={handleCheck}
                          />
                        )
                      }
                      return (
                        <Checkbox
                          key={gift.index}
                          id={gift.itemNumber}
                          name={gift.name}
                          type="checkbox"
                          label={gift.name}
                          isChecked={gift.isSelected}
                          value={gift.itemNumber}
                          onChange={handleCheck}
                        />
                      )
                    })
                  }
                  <button><a href={ticket}>Pegar o Seu Convite</a></button>
                </Form>
              ) : (
                <SignInButton />
              )
            }
        </div>
      </section>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {

  const authenticated = await getSession({req})

  const result = await fauna.query(
    q.Map(
      q.Paginate(
        q.Match(q.Index('all_gifts')),
        {size:50}
      ),
      q.Lambda(['ref'], q.Get(q.Var('ref')))
    )
  ) as { data: Array<any> }

  const gifts = result.data.map((gift, index)=>{
    const { data } = gift
    const giftId = JSON.stringify(gift.ref)
    const userID = JSON.stringify(data.userRef)
    return {
      id: String(JSON.parse(giftId)['@ref'].id),
      index,
      name: data.name,
      itemNumber: data.itemNumber,
      isSelected: data.isSelected,
      userRef: data.userRef ? String(JSON.parse(userID)['@ref'].id) : ''
    }
  })

  return {
    props: {
      gifts:gifts,
      authenticated
    },
    // revalidate: 60 * 60 * 24 //24 hours
  }
}
