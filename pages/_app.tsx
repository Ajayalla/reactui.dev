import '@styles/globals.css'
import type { AppProps } from 'next/app'
import '@fontsource/inter/variable.css'
import '@fontsource/merriweather'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <SessionProvider session={pageProps.session || undefined}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  )
}

export default App
