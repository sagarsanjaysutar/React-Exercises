/**
 * @brief Defines global layout that will be applied across all pages of the application.
 * @note A required file for Next.js.
 * @refer https://nextjs.org/docs/pages/building-your-application/routing/custom-app
 */
import type { AppProps } from 'next/app'
 
export default function App({ Component, pageProps }: AppProps) {
  return (
      <div style={{padding: 10, backgroundColor: "green"}}> 
          <Component {...pageProps} />  {/* Currently active page */}
      </div>
    );
}