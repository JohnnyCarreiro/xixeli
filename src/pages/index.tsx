import { useCallback, useRef, useState } from 'react'
import Head from 'next/head'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { Checkbox } from '@/components/Checkbox'
import { Container } from '../styles/Home'

export default function Home() {
  const formRef = useRef<FormHandles>(null)

  return (
    <Container>
      <Head>
        <title>Chá de Panela da Gisele</title>
      </Head>
      <header>
        <div className="nav">
          <div className="logo">Chá de Panela da GI</div>
          <div className="login"> Logar</div>
        </div>
      </header>
      <section>
        <div className="list-container">
          <h1>Lista de Presentes</h1>
          <Form ref={formRef} onSubmit={() => {}} className="list">
            <Checkbox
              id="item1"
              name="item1"
              type="checkbox"
              placeholder=""
              label="Item 1"
              value="Items value"
              checked
              disabled
            />
            <Checkbox
              id="item2"
              name="item2"
              type="checkbox"
              placeholder=""
              label="Item 1"
              value="Items value"
            />

            <button><a href="">Enviar</a></button>
          </Form>
        </div>
      </section>
    </Container>
  )
}
