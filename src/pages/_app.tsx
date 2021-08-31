import React from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import theme from 'styles/theme'
import { GlobalStyle } from 'styles/GlobalStyle'

interface MyAppProps extends AppProps {}

export default function MyApp({Component, pageProps}:MyAppProps){

    return(
        <ThemeProvider theme={theme} >
            <Component { ...pageProps }/>
            <GlobalStyle />
        </ThemeProvider>
    )
}
