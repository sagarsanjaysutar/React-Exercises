/**
 * @brief Initial response page that is rendered by & sent from the server.
 * @note A required file for Next.js.
 * @refer https://nextjs.org/docs/pages/building-your-application/routing/custom-document
 */
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
