import '@styles/globals.css'
import type { AppProps } from 'next/app'
import '@fontsource/inter/variable.css'
import '@fontsource/merriweather'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import * as React from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const [queryClient] = React.useState(() => new QueryClient())
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false} />
        <SessionProvider session={pageProps.session || undefined}>
          {getLayout(<Component {...pageProps} />)}
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default App
