import '../styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
 
export default function App({ Component, pageProps }: AppProps) {
  return (
      <>
          <Head>
            <title>Discrete Mathematics @ ETHZ</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Component {...pageProps} />
      </>
  )
}
