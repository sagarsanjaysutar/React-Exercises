/**
 * A required file for Next.js that defines global layout.
 * This is a boiler-plate code from 
 * https://nextjs.org/docs/pages/building-your-application/routing/custom-app
 */
import type { AppProps } from 'next/app'
 
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}